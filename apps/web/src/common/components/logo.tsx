import { useColorMode } from '@chakra-ui/react';
import { Icon, IconProps } from '@chakra-ui/react';

type LogoProps = IconProps & {
  size?: number;
};

export const Logo = ({ size, ...iconProps }: LogoProps) => {
  const { colorMode } = useColorMode();
  const width = 199 * (size || 1);
  const height = 72 * (size || 1);

  return colorMode === 'light' ? (
    <Icon
      viewBox="0 0 199 72"
      width={`${width}px`}
      height={`${height}px`}
      {...iconProps}
    >
      <path
        d="M142.455 8.22784C158.735 2.90569 165.8 52.8692 180.205 46.3374C194.61 39.8057 126.175 13.55 142.455 8.22784Z"
        fill="#97D3E7"
      />
      <path
        d="M172.741 51.3691C174.298 51.0138 174.687 50.925 176.61 49.3561"
        stroke="#1B2027"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M142.534 3.71039C143.472 2.15321 143.706 1.76392 145.853 1.2256"
        stroke="#1B2027"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M171.928 49.2045C173.574 49.2591 173.995 49.3766 175.619 48.2474"
        stroke="#1B2027"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M144.635 4.46343C145.264 3.21569 145.35 2.82522 146.832 2.40391"
        stroke="#1B2027"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M158.75 27.7499C160.25 26.7499 161.25 26.2499 162.25 27.2499C163 28 162.75 28.75 161.75 30.7499L160.25 29.2499L158.75 27.7499Z"
        fill="#EAC226"
      />
      <path
        d="M35.9304 50.88C35.2371 50.0267 34.8904 49.2667 34.8904 48.6C34.8904 47.9067 35.4637 47 36.6104 45.88C37.2771 45.24 37.9837 44.92 38.7304 44.92C39.4771 44.92 40.5171 45.5867 41.8504 46.92C42.2237 47.3733 42.7571 47.8133 43.4504 48.24C44.1437 48.64 44.7837 48.84 45.3704 48.84C47.8504 48.84 49.0904 47.8267 49.0904 45.8C49.0904 45.1867 48.7437 44.68 48.0504 44.28C47.3837 43.8533 46.5437 43.5467 45.5304 43.36C44.5171 43.1733 43.4237 42.88 42.2504 42.48C41.0771 42.0533 39.9837 41.56 38.9704 41C37.9571 40.44 37.1037 39.56 36.4104 38.36C35.7437 37.1333 35.4104 35.6667 35.4104 33.96C35.4104 31.6133 36.2771 29.5733 38.0104 27.84C39.7704 26.08 42.1571 25.2 45.1704 25.2C46.7704 25.2 48.2237 25.4133 49.5304 25.84C50.8637 26.24 51.7837 26.6533 52.2904 27.08L53.2904 27.84C54.1171 28.6133 54.5304 29.2667 54.5304 29.8C54.5304 30.3333 54.2104 31.0667 53.5704 32C52.6637 33.3333 51.7304 34 50.7704 34C50.2104 34 49.5171 33.7333 48.6904 33.2C48.6104 33.1467 48.4504 33.0133 48.2104 32.8C47.9971 32.5867 47.7971 32.4133 47.6104 32.28C47.0504 31.9333 46.3304 31.76 45.4504 31.76C44.5971 31.76 43.8771 31.9733 43.2904 32.4C42.7304 32.8 42.4504 33.3733 42.4504 34.12C42.4504 34.84 42.7837 35.4267 43.4504 35.88C44.1437 36.3333 44.9971 36.64 46.0104 36.8C47.0237 36.96 48.1304 37.2133 49.3304 37.56C50.5304 37.88 51.6371 38.28 52.6504 38.76C53.6637 39.24 54.5037 40.08 55.1704 41.28C55.8637 42.4533 56.2104 43.9067 56.2104 45.64C56.2104 47.3733 55.8637 48.9067 55.1704 50.24C54.4771 51.5467 53.5704 52.56 52.4504 53.28C50.2904 54.6933 47.9837 55.4 45.5304 55.4C44.2771 55.4 43.0904 55.2533 41.9704 54.96C40.8504 54.64 39.9437 54.2533 39.2504 53.8C37.8371 52.9467 36.8504 52.12 36.2904 51.32L35.9304 50.88ZM84.4507 31.6C85.1441 33.0133 85.4907 34.5867 85.4907 36.32C85.4907 38.0533 85.1441 39.6267 84.4507 41.04C83.7574 42.4267 82.8641 43.5333 81.7707 44.36C79.5574 46.0667 77.2641 46.92 74.8907 46.92H69.8907V51.44C69.8907 52.0533 69.8641 52.52 69.8107 52.84C69.7841 53.1333 69.6641 53.48 69.4507 53.88C69.0774 54.6 68.0374 54.96 66.3307 54.96C64.4641 54.96 63.3707 54.4667 63.0507 53.48C62.8907 53.0267 62.8107 52.3333 62.8107 51.4V29.2C62.8107 28.5867 62.8241 28.1333 62.8507 27.84C62.9041 27.52 63.0374 27.16 63.2507 26.76C63.6241 26.04 64.6641 25.68 66.3707 25.68H74.9307C77.2774 25.68 79.5574 26.5333 81.7707 28.24C82.8641 29.0667 83.7574 30.1867 84.4507 31.6ZM74.9307 39.84C75.7307 39.84 76.5174 39.5467 77.2907 38.96C78.0641 38.3733 78.4507 37.4933 78.4507 36.32C78.4507 35.1467 78.0641 34.2667 77.2907 33.68C76.5174 33.0667 75.7174 32.76 74.8907 32.76H69.8907V39.84H74.9307Z"
        fill="#EAC226"
      />
      <path
        d="M109.004 27.76L119.804 50.08C120.257 50.9867 120.484 51.6667 120.484 52.12C120.484 53.08 119.711 53.9467 118.164 54.72C117.257 55.1733 116.537 55.4 116.004 55.4C115.497 55.4 115.071 55.28 114.724 55.04C114.404 54.8 114.164 54.5467 114.004 54.28C113.871 54.0133 113.671 53.6133 113.404 53.08L111.324 48.76H100.244L98.1642 53.08C97.8975 53.6133 97.6842 54 97.5242 54.24C97.3908 54.48 97.1508 54.7333 96.8042 55C96.4842 55.24 96.0575 55.36 95.5242 55.36C95.0175 55.36 94.3108 55.1333 93.4042 54.68C91.8575 53.9333 91.0842 53.08 91.0842 52.12C91.0842 51.6667 91.3108 50.9867 91.7642 50.08L102.564 27.72C102.857 27.1067 103.297 26.6133 103.884 26.24C104.497 25.8667 105.137 25.68 105.804 25.68C107.244 25.68 108.311 26.3733 109.004 27.76ZM105.764 37.36L103.124 42.84H108.444L105.764 37.36ZM126.67 29.2C126.67 28.5867 126.683 28.1333 126.71 27.84C126.763 27.52 126.897 27.16 127.11 26.76C127.483 26.04 128.523 25.68 130.23 25.68C132.097 25.68 133.203 26.1733 133.55 27.16C133.683 27.6133 133.75 28.3067 133.75 29.24V51.48C133.75 52.12 133.723 52.5867 133.67 52.88C133.643 53.1733 133.523 53.52 133.31 53.92C132.937 54.64 131.897 55 130.19 55C128.323 55 127.23 54.4933 126.91 53.48C126.75 53.0533 126.67 52.3733 126.67 51.44V29.2ZM163.384 50.04C163.784 51 163.984 51.6933 163.984 52.12C163.984 53.1333 163.157 53.9867 161.504 54.68C160.65 55.0533 159.957 55.24 159.424 55.24C158.917 55.24 158.49 55.12 158.144 54.88C157.824 54.6133 157.584 54.3467 157.424 54.08C157.157 53.5733 156.117 51.16 154.304 46.84L153.064 46.92H148.024V51.44C148.024 52.0533 147.997 52.52 147.944 52.84C147.917 53.1333 147.797 53.48 147.584 53.88C147.21 54.6 146.17 54.96 144.464 54.96C142.597 54.96 141.504 54.4667 141.184 53.48C141.024 53.0267 140.944 52.3333 140.944 51.4V29.2C140.944 28.5867 140.957 28.1333 140.984 27.84C141.037 27.52 141.17 27.16 141.384 26.76C141.757 26.04 142.797 25.68 144.504 25.68H153.144C155.49 25.68 157.77 26.5333 159.984 28.24C161.05 29.0667 161.93 30.1867 162.624 31.6C163.317 33.0133 163.664 34.5867 163.664 36.32C163.664 39.3333 162.664 41.8133 160.664 43.76C161.25 45.1733 162.157 47.2667 163.384 50.04ZM148.024 39.84H153.144C153.917 39.84 154.69 39.5467 155.464 38.96C156.237 38.3733 156.624 37.4933 156.624 36.32C156.624 35.1467 156.237 34.2667 155.464 33.68C154.69 33.0667 153.89 32.76 153.064 32.76H148.024V39.84Z"
        fill="#1B2027"
      />
    </Icon>
  ) : (
    <Icon viewBox="0 0 199 72" width={width} height={height} {...iconProps}>
      <path
        d="M142.455 7.72784C158.735 2.40569 165.8 52.3692 180.205 45.8374C194.61 39.3057 126.175 13.05 142.455 7.72784Z"
        fill="#97D3E7"
      />
      <path
        d="M172.741 50.8691C174.298 50.5138 174.687 50.425 176.61 48.8561"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M142.534 3.21039C143.472 1.65321 143.706 1.26392 145.853 0.725597"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M171.928 48.7045C173.574 48.7591 173.995 48.8767 175.619 47.7475"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M144.635 3.96343C145.264 2.71569 145.35 2.32522 146.832 1.90391"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M158.75 27.2499C160.25 26.2499 161.25 25.7499 162.25 26.7499C163 27.5 162.75 28.25 161.75 30.2499L160.25 28.7499L158.75 27.2499Z"
        fill="#EAC226"
      />
      <path
        d="M35.9304 50.38C35.2371 49.5267 34.8904 48.7667 34.8904 48.1C34.8904 47.4067 35.4637 46.5 36.6104 45.38C37.2771 44.74 37.9837 44.42 38.7304 44.42C39.4771 44.42 40.5171 45.0867 41.8504 46.42C42.2237 46.8733 42.7571 47.3133 43.4504 47.74C44.1437 48.14 44.7837 48.34 45.3704 48.34C47.8504 48.34 49.0904 47.3267 49.0904 45.3C49.0904 44.6867 48.7437 44.18 48.0504 43.78C47.3837 43.3533 46.5437 43.0467 45.5304 42.86C44.5171 42.6733 43.4237 42.38 42.2504 41.98C41.0771 41.5533 39.9837 41.06 38.9704 40.5C37.9571 39.94 37.1037 39.06 36.4104 37.86C35.7437 36.6333 35.4104 35.1667 35.4104 33.46C35.4104 31.1133 36.2771 29.0733 38.0104 27.34C39.7704 25.58 42.1571 24.7 45.1704 24.7C46.7704 24.7 48.2237 24.9133 49.5304 25.34C50.8637 25.74 51.7837 26.1533 52.2904 26.58L53.2904 27.34C54.1171 28.1133 54.5304 28.7667 54.5304 29.3C54.5304 29.8333 54.2104 30.5667 53.5704 31.5C52.6637 32.8333 51.7304 33.5 50.7704 33.5C50.2104 33.5 49.5171 33.2333 48.6904 32.7C48.6104 32.6467 48.4504 32.5133 48.2104 32.3C47.9971 32.0867 47.7971 31.9133 47.6104 31.78C47.0504 31.4333 46.3304 31.26 45.4504 31.26C44.5971 31.26 43.8771 31.4733 43.2904 31.9C42.7304 32.3 42.4504 32.8733 42.4504 33.62C42.4504 34.34 42.7837 34.9267 43.4504 35.38C44.1437 35.8333 44.9971 36.14 46.0104 36.3C47.0237 36.46 48.1304 36.7133 49.3304 37.06C50.5304 37.38 51.6371 37.78 52.6504 38.26C53.6637 38.74 54.5037 39.58 55.1704 40.78C55.8637 41.9533 56.2104 43.4067 56.2104 45.14C56.2104 46.8733 55.8637 48.4067 55.1704 49.74C54.4771 51.0467 53.5704 52.06 52.4504 52.78C50.2904 54.1933 47.9837 54.9 45.5304 54.9C44.2771 54.9 43.0904 54.7533 41.9704 54.46C40.8504 54.14 39.9437 53.7533 39.2504 53.3C37.8371 52.4467 36.8504 51.62 36.2904 50.82L35.9304 50.38ZM84.4507 31.1C85.1441 32.5133 85.4907 34.0867 85.4907 35.82C85.4907 37.5533 85.1441 39.1267 84.4507 40.54C83.7574 41.9267 82.8641 43.0333 81.7707 43.86C79.5574 45.5667 77.2641 46.42 74.8907 46.42H69.8907V50.94C69.8907 51.5533 69.8641 52.02 69.8107 52.34C69.7841 52.6333 69.6641 52.98 69.4507 53.38C69.0774 54.1 68.0374 54.46 66.3307 54.46C64.4641 54.46 63.3707 53.9667 63.0507 52.98C62.8907 52.5267 62.8107 51.8333 62.8107 50.9V28.7C62.8107 28.0867 62.8241 27.6333 62.8507 27.34C62.9041 27.02 63.0374 26.66 63.2507 26.26C63.6241 25.54 64.6641 25.18 66.3707 25.18H74.9307C77.2774 25.18 79.5574 26.0333 81.7707 27.74C82.8641 28.5667 83.7574 29.6867 84.4507 31.1ZM74.9307 39.34C75.7307 39.34 76.5174 39.0467 77.2907 38.46C78.0641 37.8733 78.4507 36.9933 78.4507 35.82C78.4507 34.6467 78.0641 33.7667 77.2907 33.18C76.5174 32.5667 75.7174 32.26 74.8907 32.26H69.8907V39.34H74.9307Z"
        fill="#EAC226"
      />
      <path
        d="M109.004 27.26L119.804 49.58C120.257 50.4867 120.484 51.1667 120.484 51.62C120.484 52.58 119.711 53.4467 118.164 54.22C117.257 54.6733 116.537 54.9 116.004 54.9C115.497 54.9 115.071 54.78 114.724 54.54C114.404 54.3 114.164 54.0467 114.004 53.78C113.871 53.5133 113.671 53.1133 113.404 52.58L111.324 48.26H100.244L98.1642 52.58C97.8975 53.1133 97.6842 53.5 97.5242 53.74C97.3908 53.98 97.1508 54.2333 96.8042 54.5C96.4842 54.74 96.0575 54.86 95.5242 54.86C95.0175 54.86 94.3108 54.6333 93.4042 54.18C91.8575 53.4333 91.0842 52.58 91.0842 51.62C91.0842 51.1667 91.3108 50.4867 91.7642 49.58L102.564 27.22C102.857 26.6067 103.297 26.1133 103.884 25.74C104.497 25.3667 105.137 25.18 105.804 25.18C107.244 25.18 108.311 25.8733 109.004 27.26ZM105.764 36.86L103.124 42.34H108.444L105.764 36.86ZM126.67 28.7C126.67 28.0867 126.683 27.6333 126.71 27.34C126.763 27.02 126.897 26.66 127.11 26.26C127.483 25.54 128.523 25.18 130.23 25.18C132.097 25.18 133.203 25.6733 133.55 26.66C133.683 27.1133 133.75 27.8067 133.75 28.74V50.98C133.75 51.62 133.723 52.0867 133.67 52.38C133.643 52.6733 133.523 53.02 133.31 53.42C132.937 54.14 131.897 54.5 130.19 54.5C128.323 54.5 127.23 53.9933 126.91 52.98C126.75 52.5533 126.67 51.8733 126.67 50.94V28.7ZM163.384 49.54C163.784 50.5 163.984 51.1933 163.984 51.62C163.984 52.6333 163.157 53.4867 161.504 54.18C160.65 54.5533 159.957 54.74 159.424 54.74C158.917 54.74 158.49 54.62 158.144 54.38C157.824 54.1133 157.584 53.8467 157.424 53.58C157.157 53.0733 156.117 50.66 154.304 46.34L153.064 46.42H148.024V50.94C148.024 51.5533 147.997 52.02 147.944 52.34C147.917 52.6333 147.797 52.98 147.584 53.38C147.21 54.1 146.17 54.46 144.464 54.46C142.597 54.46 141.504 53.9667 141.184 52.98C141.024 52.5267 140.944 51.8333 140.944 50.9V28.7C140.944 28.0867 140.957 27.6333 140.984 27.34C141.037 27.02 141.17 26.66 141.384 26.26C141.757 25.54 142.797 25.18 144.504 25.18H153.144C155.49 25.18 157.77 26.0333 159.984 27.74C161.05 28.5667 161.93 29.6867 162.624 31.1C163.317 32.5133 163.664 34.0867 163.664 35.82C163.664 38.8333 162.664 41.3133 160.664 43.26C161.25 44.6733 162.157 46.7667 163.384 49.54ZM148.024 39.34H153.144C153.917 39.34 154.69 39.0467 155.464 38.46C156.237 37.8733 156.624 36.9933 156.624 35.82C156.624 34.6467 156.237 33.7667 155.464 33.18C154.69 32.5667 153.89 32.26 153.064 32.26H148.024V39.34Z"
        fill="white"
      />
    </Icon>
  );
};
