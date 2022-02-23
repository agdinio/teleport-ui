import { chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const UITextClip = styled.span`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='%23f56565' fill-opacity='1' fill-rule='evenodd' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/svg%3E");
  background-position: 90% 80%;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
`;

const glitch = keyframes`
0% {
  clip: rect(137px, 9999px, 44px, 0);
}
4.166666666666666% {
  clip: rect(8px, 9999px, 138px, 0);
}
8.333333333333332% {
  clip: rect(130px, 9999px, 88px, 0);
}
12.5% {
  clip: rect(84px, 9999px, 149px, 0);
}
16.666666666666664% {
  clip: rect(140px, 9999px, 70px, 0);
}
20.833333333333336% {
  clip: rect(78px, 9999px, 36px, 0);
}
25% {
  clip: rect(66px, 9999px, 88px, 0);
}
29.166666666666668% {
  clip: rect(133px, 9999px, 20px, 0);
}
33.33333333333333% {
  clip: rect(107px, 9999px, 88px, 0);
}
37.5% {
  clip: rect(94px, 9999px, 47px, 0);
}
41.66666666666667% {
  clip: rect(37px, 9999px, 93px, 0);
}
45.83333333333333% {
  clip: rect(137px, 9999px, 102px, 0);
}
50% {
  clip: rect(139px, 9999px, 10px, 0);
}
54.166666666666664% {
  clip: rect(68px, 9999px, 79px, 0);
}
58.333333333333336% {
  clip: rect(112px, 9999px, 85px, 0);
}
62.5% {
  clip: rect(51px, 9999px, 45px, 0);
}
66.66666666666666% {
  clip: rect(13px, 9999px, 5px, 0);
}
70.83333333333334% {
  clip: rect(63px, 9999px, 78px, 0);
}
75% {
  clip: rect(78px, 9999px, 39px, 0);
}
79.16666666666666% {
  clip: rect(70px, 9999px, 4px, 0);
}
83.33333333333334% {
  clip: rect(24px, 9999px, 121px, 0);
}
87.5% {
  clip: rect(133px, 9999px, 46px, 0);
}
91.66666666666666% {
  clip: rect(67px, 9999px, 114px, 0);
}
95.83333333333334% {
  clip: rect(1px, 9999px, 46px, 0);
}
100% {
  clip: rect(58px, 9999px, 102px, 0);
}
`;

const glitch2 = keyframes`
6.666666666666667% {
  clip: rect(35px, 9999px, 87px, 0);
}
10% {
  clip: rect(7px, 9999px, 9px, 0);
}
13.333333333333334% {
  clip: rect(71px, 9999px, 12px, 0);
}
16.666666666666664% {
  clip: rect(36px, 9999px, 74px, 0);
}
20% {
  clip: rect(28px, 9999px, 73px, 0);
}
23.333333333333332% {
  clip: rect(67px, 9999px, 96px, 0);
}
26.666666666666668% {
  clip: rect(43px, 9999px, 115px, 0);
}
30% {
  clip: rect(115px, 9999px, 28px, 0);
}
33.33333333333333% {
  clip: rect(46px, 9999px, 144px, 0);
}
36.666666666666664% {
  clip: rect(60px, 9999px, 101px, 0);
}
40% {
  clip: rect(106px, 9999px, 89px, 0);
}
43.333333333333336% {
  clip: rect(114px, 9999px, 76px, 0);
}
46.666666666666664% {
  clip: rect(66px, 9999px, 126px, 0);
}
50% {
  clip: rect(33px, 9999px, 123px, 0);
}
53.333333333333336% {
  clip: rect(131px, 9999px, 100px, 0);
}
56.666666666666664% {
  clip: rect(17px, 9999px, 122px, 0);
}
60% {
  clip: rect(13px, 9999px, 141px, 0);
}
63.33333333333333% {
  clip: rect(44px, 9999px, 72px, 0);
}
66.66666666666666% {
  clip: rect(49px, 9999px, 96px, 0);
}
70% {
  clip: rect(32px, 9999px, 43px, 0);
}
73.33333333333333% {
  clip: rect(35px, 9999px, 4px, 0);
}
76.66666666666667% {
  clip: rect(36px, 9999px, 139px, 0);
}
80% {
  clip: rect(52px, 9999px, 59px, 0);
}
83.33333333333334% {
  clip: rect(24px, 9999px, 145px, 0);
}
86.66666666666667% {
  clip: rect(36px, 9999px, 69px, 0);
}
90% {
  clip: rect(69px, 9999px, 87px, 0);
}
93.33333333333333% {
  clip: rect(48px, 9999px, 8px, 0);
}
96.66666666666667% {
  clip: rect(82px, 9999px, 51px, 0);
}
100% {
  clip: rect(7px, 9999px, 49px, 0);
}
`;

export const Glitch = styled(chakra.span)`
  display: inline-block;
  position: relative;
  ::before,
  ::after {
    background: ${(props) => props.backgroundColor};
    content: attr(data-text);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  ::before {
    animation: ${glitch2} 3s infinite linear alternate-reverse;
    clip: rect(24px, 550px, 90px, 0);
    left: 2px;
    text-shadow: -2px 0 #14afff;
  }
  ::after {
    animation: ${glitch} 2.5s infinite linear alternate-reverse;
    clip: rect(85px, 550px, 140px, 0);
    left: -2px;
    text-shadow: -2px 0 #80ff01;
  }
`;
