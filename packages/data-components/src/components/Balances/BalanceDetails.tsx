import { useSuspenseQuery } from "@apollo/client";
import {
  Blockchain,
  formatUsd,
  formatWalletAddress,
  toDisplayBalance,
  UNKNOWN_ICON_SRC,
} from "@coral-xyz/common";
import { useTranslation } from "@coral-xyz/i18n";
import {
  useActiveWallet,
  useBlockchainExplorerNullable,
} from "@coral-xyz/recoil";
import {
  DEFAULT_SOLANA_CLUSTER,
  explorerAddressUrl,
} from "@coral-xyz/secure-background/legacyCommon";
import {
  BTC_TOKEN,
  getBitcoinPrice,
} from "@coral-xyz/secure-background/src/blockchain-configs/bitcoin";
import {
  ListItemIconCore,
  QuestionIcon,
  StyledText,
  TableCore,
  type TableCoreProps,
  TableRowCore,
  XStack,
  YStack,
  TableRowCoreLinkValue,
} from "@coral-xyz/tamagui";
import { type ReactNode, useMemo, useEffect } from "react";

import { type BalanceSummaryProps, PercentChange } from "./BalanceSummary";
import { ErrorMessage } from "./ErrorMessage";
import { gql } from "../../apollo";
import type {
  GetTokensForWalletDetailsQuery,
  ProviderId,
} from "../../apollo/graphql";
import { useBitcoinPrice } from "../../hooks";
import {
  TransactionHistory,
  type TransactionHistoryProps,
} from "../TransactionHistory";
import { _TransactionListItemBasic } from "../TransactionHistory/TransactionListItem";

const GET_TOKENS_FOR_WALLET_DETAILS = gql(`
  query GetTokensForWalletDetails($address: String!, $providerId: ProviderID!) {
    wallet(address: $address, providerId: $providerId) {
      id
      provider {
        providerId
      }
      balances {
        tokens {
          edges {
            node {
              id
              address
              displayAmount
              marketData {
                id
                marketId
                marketUrl
                percentChange
                price
                value
                valueChange
              }
              solana {
                id
                extensions {
                  id
                  currentInterestRate
                  transferFeePercentage
                  transferHook
                }
              }
              token
              tokenListEntry {
                id
                address
                logo
                name
                symbol
              }
            }
          }
        }
      }
    }
  }
`);

type _ResponseToken = NonNullable<
  NonNullable<GetTokensForWalletDetailsQuery["wallet"]>["balances"]
>["tokens"]["edges"][number]["node"];

export type BalanceDetailsProps = {
  loaderComponent?: ReactNode;
  onLinkClick: (url: string) => void;
  onTransactionItemClick?: TransactionHistoryProps["onItemClick"];
  symbol: string;
  token: string;
  widgets?: ReactNode;
};

const useTokensForWalletDetails = (payload: any) => {
  const { data } = useSuspenseQuery(GET_TOKENS_FOR_WALLET_DETAILS, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    variables: {
      address: payload.publicKey,
      transactionFilters: {
        token: payload.tokenMint,
      },
      providerId: payload.providerId,
    },
  });

  if (data?.wallet?.balances?.tokens.edges) {
    const balanceIndex = data?.wallet?.balances?.tokens.edges.findIndex(
      (balance) => balance.node.token === BTC_TOKEN.token
    );

    if (balanceIndex >= 0) {
      // data.wallet.balances.tokens.edges[balanceIndex] = {
      //   node: {
      //     ...BTC_TOKEN,
      //     displayAmount:
      //       data.wallet.balances.tokens.edges[balanceIndex].node.displayAmount,
      //     marketData:
      //       data.wallet.balances.tokens.edges[balanceIndex].node.marketData,
      //     __typename:
      //       data.wallet.balances.tokens.edges[balanceIndex].node.__typename,
      //   },
      // };
      data.wallet.balances.tokens.edges[balanceIndex] = {
        node: {
          ...data.wallet.balances.tokens.edges[balanceIndex].node,
          tokenListEntry: {
            ...BTC_TOKEN.tokenListEntry,
            id:
              data.wallet.balances.tokens.edges[balanceIndex].node
                .tokenListEntry?.id ?? BTC_TOKEN.tokenListEntry.id,
          },
          marketData: {
            // id:
            //   data.wallet.balances.tokens.edges[balanceIndex].node.marketData
            //     ?.id ?? "",
            // percentChange:
            //   data.wallet.balances.tokens.edges[balanceIndex].node.marketData
            //     ?.percentChange ?? 0,
            // price:
            //   data.wallet.balances.tokens.edges[balanceIndex].node.marketData
            //     ?.price ?? 0,
            // value:
            //   data.wallet.balances.tokens.edges[balanceIndex].node.marketData
            //     ?.value ?? 0,
            // valueChange:
            //   data.wallet.balances.tokens.edges[balanceIndex].node.marketData
            //     ?.value ?? 0,
            ...BTC_TOKEN.marketData,
            marketUrl: "https://www.coingecko.com/en/coins/bitcoin",
            marketId: "bitcoin",
          },
        },
      };
    }
  }

  return data;
};

export function BalanceDetails({
  loaderComponent,
  onLinkClick,
  onTransactionItemClick,
  token: tokenMint,
  widgets,
}: BalanceDetailsProps) {
  const { t } = useTranslation();
  const activeWallet = useActiveWallet();
  const providerId = activeWallet.blockchain.toUpperCase() as ProviderId;
  // const { data } = useSuspenseQuery(GET_TOKENS_FOR_WALLET_DETAILS, {
  //   fetchPolicy: "cache-and-network",
  //   errorPolicy: "all",
  //   variables: {
  //     address: activeWallet.publicKey,
  //     transactionFilters: {
  //       token: tokenMint,
  //     },
  //     providerId,
  //   },
  // });

  const data = useTokensForWalletDetails({
    publicKey: activeWallet.publicKey,
    tokenMint,
    providerId,
  });

  const price = useBitcoinPrice();

  const token: _ResponseToken | undefined = useMemo(() => {
    const token = JSON.parse(
      JSON.stringify(
        data?.wallet?.balances?.tokens?.edges.find(
          (e) => e.node.token === tokenMint
        )?.node
      )
    );

    if (price && token && token.token === BTC_TOKEN.token) {
      if (token.marketData) {
        const value = Number(token.displayAmount) * Number(price?.lastPrice);

        token.marketData = {
          id: token.marketData?.id ?? "",
          price: Number(price?.lastPrice),
          percentChange: Number(price?.priceChangePercent),
          value,
          valueChange: value * Number(price?.priceChangePercent),
          marketId: token.marketData.marketId,
          marketUrl: token.marketData.marketUrl,
        };
      }
    }

    return token;
  }, [data?.wallet, tokenMint, price]);

  if (!token) {
    return (
      <YStack padding="$4">
        <ErrorMessage
          icon={QuestionIcon}
          title={t("unknown_token")}
          body={t("token_not_found", { mint: tokenMint })}
        />
      </YStack>
    );
  }

  return (
    <YStack gap={20}>
      <XStack justifyContent="center" marginTop={10}>
        <ListItemIconCore
          image={token.tokenListEntry?.logo ?? UNKNOWN_ICON_SRC}
          radius="$circular"
          size={75}
        />
      </XStack>
      <TokenBalanceSummary
        amount={token.displayAmount}
        symbol={token.tokenListEntry?.symbol ?? ""}
        percentChange={token.marketData?.percentChange ?? 0}
        value={token.marketData?.value ?? 0}
        valueChange={token.marketData?.valueChange ?? 0}
      />
      {widgets}
      {token.marketData && token.tokenListEntry ? (
        <TokenMarketInfoTable
          extensions={token.solana?.extensions}
          market={{
            id: token.marketData.marketId,
            link: token.marketData.marketUrl,
            price: token.marketData.price,
          }}
          name={token.tokenListEntry.name}
          onLinkClick={onLinkClick}
          style={{ marginHorizontal: 16 }}
          symbol={token.tokenListEntry.symbol}
        />
      ) : null}
      <TransactionHistory
        address={activeWallet.publicKey}
        providerId={providerId}
        fetchPolicy="cache-and-network"
        limit={25}
        loaderComponent={loaderComponent}
        onItemClick={onTransactionItemClick}
        pollingIntervalSeconds="disabled"
        style={{ position: "relative" }}
        tokenMint={tokenMint}
      />
    </YStack>
  );
}

type TokenBalanceSummaryProps = BalanceSummaryProps & {
  amount: string;
  symbol: string;
};

function TokenBalanceSummary({
  amount,
  percentChange,
  style,
  value,
}: TokenBalanceSummaryProps) {
  return (
    <YStack alignItems="center" gap={2} justifyContent="center" {...style}>
      <XStack alignItems="center" gap={4}>
        <StyledText fontSize="$3xl" fontWeight="700">
          {toDisplayBalance(amount, 0, true, true)}
        </StyledText>
      </XStack>
      <XStack alignItems="center" gap={2}>
        <StyledText color="$baseTextMedEmphasis">{formatUsd(value)}</StyledText>
        <PercentChange removeBackground value={percentChange} />
      </XStack>
    </YStack>
  );
}

type TokenMarketInfoTableProps = {
  extensions?: NonNullable<_ResponseToken["solana"]>["extensions"];
  market: {
    id?: string;
    link: string;
    price: number;
  };
  name: string;
  onLinkClick: (url: string) => void;
  style?: TableCoreProps["style"];
  symbol: string;
};

export function TokenMarketInfoTable({
  extensions,
  market,
  name,
  onLinkClick,
  style,
  symbol,
}: TokenMarketInfoTableProps) {
  const { t } = useTranslation();
  const explorer = useBlockchainExplorerNullable(Blockchain.SOLANA);

  const tokenNameValue = useMemo(
    () => <TableRowCoreLinkValue content={`${name} (${symbol})`} />,
    [name, symbol]
  );

  const transferHookValue = useMemo(() => {
    if (!extensions?.transferHook) return null;
    return (
      <TableRowCoreLinkValue
        content={formatWalletAddress(extensions.transferHook)}
      />
    );
  }, [extensions?.transferHook]);

  const priceValue = useMemo(
    () => (market?.price ? formatUsd(market.price, 8) : "-"),
    [market?.price]
  );

  return (
    <TableCore style={style}>
      <TableRowCore
        label={t("token")}
        value={tokenNameValue}
        onPress={market ? () => onLinkClick(market.link) : undefined}
      />
      <TableRowCore label="Price" value={priceValue} />
      {extensions?.currentInterestRate && (
        <TableRowCore
          label={t("interest_rate")}
          value={`${extensions.currentInterestRate}%`}
        />
      )}
      {extensions?.transferFeePercentage && (
        <TableRowCore
          label={t("transfer_fee")}
          value={`${extensions.transferFeePercentage}%`}
        />
      )}
      {extensions?.transferHook && explorer ? (
        <TableRowCore
          value={transferHookValue}
          label={t("transfer_hook")}
          onPress={() =>
            onLinkClick(
              explorerAddressUrl(
                explorer,
                extensions.transferHook!,
                DEFAULT_SOLANA_CLUSTER
              )
            )
          }
        />
      ) : null}
    </TableCore>
  );
}
