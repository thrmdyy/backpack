import {
  SvgProps,
  default as Svg,
  Line,
  Path,
  Circle,
  Rect,
} from "react-native-svg";

export const MenuIcon = (props: SvgProps) => {
  const { width, height, color, ...otherProps } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <Line x1="4" x2="20" y1="12" y2="12" stroke={color} />
      <Line x1="4" x2="20" y1="6" y2="6" stroke={color} />
      <Line x1="4" x2="20" y1="18" y2="18" stroke={color} />
    </Svg>
  );
};

export function RedBackpackIcon(props: SvgProps) {
  return (
    <Svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
      <Path
        d="M54.7662 5.06763L42.1848 5L49.0827 45.0859C49.6561 48.4334 51.9666 51.2061 55.1373 52.3727L73.0312 58.9325L79.3557 48.0276L62.3724 41.7552C61.5798 41.4678 61.0064 40.7747 60.8546 39.9293L54.7662 5.06763Z"
        fill="#5BFEC8"
      />
      <Path
        d="M40.5945 23.8506L37.2552 5.05035H24.6738L27.8107 22.9208C27.9625 23.7492 27.642 24.5945 27.0012 25.1525L0 47.9427L6.25698 58.8814L37.3564 32.7605C39.9536 30.5795 41.1848 27.1813 40.5945 23.8506Z"
        fill="#5BFEC8"
      />
      <Path
        d="M32.1114 49.4672C28.9407 48.3006 25.3822 48.9262 22.7849 51.1071L8.17969 63.3814L14.4367 74.3201L28.3336 62.6882C28.9745 62.1472 29.8683 61.9951 30.661 62.2825L63.8348 74.4046L70.1761 63.5167L32.0945 49.501L32.1114 49.4672Z"
        fill="#5BFEC8"
      />
    </Svg>
  );
}

type SvgIconProps = SvgProps & { fill?: string };

export function TwitterIcon({
  fill = "#FAFAFA",
  ...props
}: SvgIconProps): JSX.Element {
  return (
    <Svg width={24} height={24} fill="none" {...props} viewBox="0 0 24 24">
      <Path
        d="M7.548 21.901c9.056 0 14.01-7.503 14.01-14.01 0-.213 0-.426-.014-.636A10.018 10.018 0 0 0 24 4.704a9.827 9.827 0 0 1-2.828.775 4.942 4.942 0 0 0 2.164-2.724A9.87 9.87 0 0 1 20.21 3.95a4.928 4.928 0 0 0-8.391 4.492A13.98 13.98 0 0 1 1.67 3.298 4.927 4.927 0 0 0 3.194 9.87 4.888 4.888 0 0 1 .96 9.256v.062a4.926 4.926 0 0 0 3.95 4.826 4.915 4.915 0 0 1-2.223.084 4.93 4.93 0 0 0 4.6 3.42A9.878 9.878 0 0 1 0 19.688a13.94 13.94 0 0 0 7.548 2.208"
        fill={fill}
      />
    </Svg>
  );
}

export function DiscordIcon({
  fill = "#FAFAFA",
  ...props
}: SvgIconProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 71 55" fill="none" {...props}>
      <Path
        d="M60.105 4.898A58.55 58.55 0 0 0 45.653.415a.22.22 0 0 0-.233.11 40.784 40.784 0 0 0-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 0 0-.233-.11 58.386 58.386 0 0 0-14.451 4.483.207.207 0 0 0-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 0 0 .093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 0 0 .249-.082 42.08 42.08 0 0 0 3.627-5.9.225.225 0 0 0-.123-.312 38.772 38.772 0 0 1-5.539-2.64.228.228 0 0 1-.022-.378 31.17 31.17 0 0 0 1.1-.862.22.22 0 0 1 .23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 0 1 .233.027c.356.293.728.586 1.103.865a.228.228 0 0 1-.02.378 36.384 36.384 0 0 1-5.54 2.637.227.227 0 0 0-.121.315 47.249 47.249 0 0 0 3.624 5.897.225.225 0 0 0 .249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 0 0 .092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 0 0-.093-.084Zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156Zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156Z"
        fill={fill}
      />
    </Svg>
  );
}

export function QuestionIcon({
  fill = "#A1A1AA",
  ...props
}: SvgIconProps): JSX.Element {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" fill="none" {...props}>
      <Path
        d="M28.335 5C15.4677 5 5 15.4677 5 28.335C5 41.2023 15.4677 51.67 28.335 51.67C41.2023 51.67 51.67 41.2023 51.67 28.335C51.67 15.4677 41.2023 5 28.335 5ZM27.3627 41.9471C25.7526 41.9471 24.4458 40.6403 24.4458 39.0302C24.4458 37.4201 25.7526 36.1133 27.3627 36.1133C28.9728 36.1133 30.2796 37.4201 30.2796 39.0302C30.2796 40.6403 28.9728 41.9471 27.3627 41.9471ZM35.7458 24.6928C35.1449 25.6554 34.0035 26.7366 32.3195 27.9383C29.5951 29.9529 29.669 30.4001 29.669 32.2242H24.8911C24.8911 30.7988 24.86 29.704 25.6301 28.3719C26.1221 27.5183 27.0244 26.6102 28.335 25.6495C29.9082 24.5256 31.4366 23.4424 31.4366 21.5562C31.4366 19.7886 29.9237 19.1585 28.1561 19.1585C26.3535 19.1585 24.298 19.7477 21.9898 20.9261L20.0239 16.9786C24.2183 14.6276 30.8377 13.5639 34.4565 16.51C37.1128 18.6743 37.1284 22.4799 35.7458 24.6928Z"
        fill={fill}
      />
    </Svg>
  );
}

export function HardwareIcon({
  fill = "#8F929E",
  ...props
}: SvgIconProps): JSX.Element {
  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M8.555 10.887c-.309 0-.575.107-.79.32a1.064 1.064 0 0 0-.324.783c0 .307.108.57.324.784.215.213.481.32.79.32.31 0 .575-.107.79-.32.216-.213.325-.477.325-.784 0-.306-.109-.57-.324-.783a1.086 1.086 0 0 0-.79-.32ZM18.807 8.5H5.923a.785.785 0 0 0-.573.222.794.794 0 0 0-.225.588v5.263c0 .247.07.464.215.645a.718.718 0 0 0 .583.282h12.884a.738.738 0 0 0 .603-.282c.145-.18.215-.398.215-.645V9.31a.794.794 0 0 0-.225-.588.811.811 0 0 0-.593-.222Zm-.62 5.576H6.563V9.924h11.625v4.152Z"
        fill={fill}
        stroke={fill}
        opacity={0.5}
      />
    </Svg>
  );
}

export function SolanaIcon({ fill = "#8E919F", ...props }: SvgIconProps) {
  return (
    <Svg width="14" height="11" viewBox="0 0 14 11" fill="none" {...props}>
      <Path
        d="M2.19379 8.26525C2.27671 8.18344 2.38855 8.13763 2.50504 8.13775H13.2795C13.323 8.13716 13.3656 8.1496 13.4019 8.17346C13.4382 8.19731 13.4666 8.2315 13.4833 8.2716C13.5 8.31171 13.5043 8.3559 13.4956 8.39848C13.487 8.44106 13.4658 8.48008 13.4348 8.5105L11.3063 10.6217C11.2235 10.7038 11.1116 10.7499 10.995 10.75H0.220539C0.177104 10.7504 0.134546 10.7378 0.0983118 10.7138C0.0620779 10.6899 0.0338164 10.6556 0.0171442 10.6155C0.000472015 10.5754 -0.00385263 10.5312 0.00472415 10.4887C0.0133009 10.4461 0.0343888 10.407 0.0652888 10.3765L2.19379 8.26525ZM2.19379 0.3775C2.27671 0.295689 2.38855 0.249875 2.50504 0.25H13.2795C13.4753 0.25 13.5735 0.4855 13.4348 0.6235L11.3063 2.73475C11.2234 2.81656 11.1115 2.86238 10.995 2.86225H0.220539C0.177259 2.86247 0.134891 2.84981 0.09882 2.82589C0.0627494 2.80197 0.0346054 2.76787 0.0179646 2.72792C0.00132384 2.68796 -0.00306196 2.64396 0.00536466 2.60151C0.0137913 2.55906 0.0346496 2.52007 0.0652888 2.4895L2.19379 0.3775ZM11.3063 4.29625C11.2234 4.21444 11.1115 4.16863 10.995 4.16875H0.220539C0.177104 4.16838 0.134546 4.18098 0.0983118 4.20493C0.0620779 4.22889 0.0338164 4.26311 0.0171442 4.30322C0.000472015 4.34333 -0.00385263 4.3875 0.00472415 4.43009C0.0133009 4.47267 0.0343888 4.51172 0.0652888 4.54225L2.19379 6.6535C2.27629 6.73525 2.38879 6.781 2.50504 6.781H13.2795C13.323 6.78137 13.3655 6.76877 13.4018 6.74482C13.438 6.72086 13.4663 6.68664 13.4829 6.64653C13.4996 6.60642 13.5039 6.56225 13.4954 6.51966C13.4868 6.47708 13.4657 6.43803 13.4348 6.4075L11.3063 4.29625Z"
        fill={fill}
      />
    </Svg>
  );
}

export function SuccessCheckMarkIcon({
  fill = "#00C278",
  ...props
}: SvgIconProps) {
  return (
    <Svg width="101" height="100" viewBox="0 0 101 100" fill="none" {...props}>
      <Circle cx="50.5" cy="50" r="50" fill="#00C278" fillOpacity="0.08" />
      <Path
        d="M43.59 57.7498L36.65 50.8098C35.87 50.0298 34.61 50.0298 33.83 50.8098C33.05 51.5898 33.05 52.8498 33.83 53.6298L42.19 61.9898C42.97 62.7698 44.23 62.7698 45.01 61.9898L66.17 40.8298C66.95 40.0498 66.95 38.7898 66.17 38.0098C65.39 37.2298 64.13 37.2298 63.35 38.0098L43.59 57.7498Z"
        fill={fill}
      />
    </Svg>
  );
}

export function ErrorCrossMarkIcon({
  fill = "#FF575A",
  ...props
}: SvgIconProps) {
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100" fill="none" {...props}>
      <Circle cx="50" cy="50" r="50" fill="#F33437" fillOpacity="0.12" />
      <Path
        d="M62.5999 37.4199C61.8199 36.6399 60.5599 36.6399 59.7799 37.4199L49.9999 47.1799L40.2199 37.3999C39.4399 36.6199 38.1799 36.6199 37.3999 37.3999C36.6199 38.1799 36.6199 39.4399 37.3999 40.2199L47.1799 49.9999L37.3999 59.7799C36.6199 60.5599 36.6199 61.8199 37.3999 62.5999C38.1799 63.3799 39.4399 63.3799 40.2199 62.5999L49.9999 52.8199L59.7799 62.5999C60.5599 63.3799 61.8199 63.3799 62.5999 62.5999C63.3799 61.8199 63.3799 60.5599 62.5999 59.7799L52.8199 49.9999L62.5999 40.2199C63.3599 39.4599 63.3599 38.1799 62.5999 37.4199Z"
        fill={fill}
      />
    </Svg>
  );
}

export function TensorLogoIcon({ fill = "white", ...props }: SvgIconProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Rect width="24" height="24" rx="4" fill="black" />
      <Path
        d="M10.5187 2.69971L1.19061 12.056H5.26874L7.82811 9.49658V18.5997L10.5187 21.2903V2.69971ZM13.5094 2.69971L22.8375 12.056H18.7594L16.2 9.49658V18.5997L13.5094 21.2903V2.69971Z"
        fill={fill}
      />
    </Svg>
  );
}
