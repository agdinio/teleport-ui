import React from "react";

import { Flex, Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

const Mission = styled(Flex)<{
  rarity?: "common" | "rare" | "epic" | "legendary";
  isHeader?: boolean;
}>`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-flow: row;
  line-height: 18px;
  margin-bottom: 1vh;
  padding: 5px;

  ${(props) =>
    props.isHeader &&
    css`
      color: #959595;
      cursor: default;
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 2vh;
      text-transform: lowercase;
    `}

  &:hover {
    background-color: rgba(170, 170, 170, 0.3);
    ${(props) =>
      props.rarity === "common" &&
      css`
        background-color: rgba(170, 170, 170, 0.3);
      `};
    ${(props) =>
      props.rarity === "rare" &&
      css`
        background-color: rgba(8, 163, 221, 0.3);
      `};
    ${(props) =>
      props.rarity === "epic" &&
      css`
        background-color: rgba(135, 35, 217, 0.3);
      `};
    ${(props) =>
      props.rarity === "legendary" &&
      css`
        background-color: rgba(179, 92, 18, 0.3);
      `};
    ${(props) =>
      props.isHeader &&
      css`
        background: transparent;
      `}
`;

const HeaderText = styled(Box)<{
  type?:
    | "type"
    | "mission"
    | "duration"
    | "rewards"
    | "rarity"
    | "crafts"
    | "departure"
    | "action";
}>`
  cursor: pointer;
  flex: 1 1;
  font-weight: 700 !important;
  padding: 0 1vh;
  text-align: center;
  white-space: nowrap;

  ${(props) =>
    props.type === "mission" &&
    css`
      flex: 3 1;
      text-align: left;
    `}

  ${(props) =>
    props.type === "rewards" &&
    css`
      flex: 2 1;
      text-align: left;
      white-space: normal;
    `}

  ${(props) =>
    props.type === "crafts" &&
    css`
      flex: 2 1;
      text-align: left;
    `}
`;

const Management = () => {
  // @ts-ignore
  return (
    <>
      <div id="missioncentre" className="contents active">
        <div className="contentswrap">
          <div className="missionwrap">
            <div className="opener">
              <div className="description">
                <div className="icon missions"></div>
                <div className="thecontent">
                  <div className="title">Mission Centre</div>
                  <p>Explore Missions, Discover NFTs</p>
                  <p className="notice">
                    Rarity = NFT Card (Common, Rare, Epic, Legendary)
                  </p>
                </div>
              </div>
              <div className="user-details">
                <div className="username">*Your BSC Address</div>
                <div className="user-trilium">
                  <span>Your Available Trilium</span>
                  <div className="icon trilium"></div>
                  <span className="amount">00000000</span>
                </div>
              </div>
            </div>

            <div className="missionscontainer">
              <div className="missionsswrap">
                <Mission isHeader>
                  <HeaderText type="type">Type</HeaderText>
                  <HeaderText type="mission">Mission</HeaderText>
                  <HeaderText type="duration">Duration</HeaderText>
                  <HeaderText type="rewards">Rewards</HeaderText>
                  <HeaderText type="rarity">Rarity</HeaderText>
                  <HeaderText type="crafts">Crafts Leased</HeaderText>
                  <HeaderText type="departure">Departure</HeaderText>
                  <HeaderText type="action" />
                </Mission>

                <div className="mission cl-titles">
                  <div className="mtype">Type</div>
                  <div className="title reverse">Mission</div>
                  <div className="duration reverse">Duration</div>

                  <div className="rewards reverse">
                    <div className="icon trilium"></div>
                    Rewards<span>*Shared by all Leased Spacecraft</span>
                  </div>

                  <div className="rarity">Rarity</div>
                  <div className="crafts filtering">Crafts Leased</div>
                  <div className="departure">Departure</div>
                  <div className="action"></div>
                </div>
                <div className="mission common explore">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>

                  <div className="title">
                    <span>Mission Title</span>
                  </div>

                  <div className="duration">1 Week</div>

                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>

                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>

                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>

                  <div className="departure">
                    <div className="days">2</div>
                    <div className="hours">6</div>
                    <div className="mins">2</div>
                  </div>

                  <div className="action">
                    <a className="button invert">Info</a>
                  </div>
                </div>

                <div className="mission common battle soon">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">1 Week</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">
                    <div className="days">2</div>
                    <div className="hours">6</div>
                    <div className="mins">2</div>
                  </div>
                  <div className="action">
                    <a className="button invert">Info</a>
                  </div>
                </div>

                <div className="mission rare scouting engaged">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">2 Weeks</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user">
                      2 <span>/</span>
                    </span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">
                    <div className="days">2</div>
                    <div className="hours">6</div>
                    <div className="mins">2</div>
                  </div>
                  <div className="action">Engaged</div>
                </div>

                <div className="mission rare artifact departed">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">2 Weeks</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">--</div>
                  <div className="action">Departed</div>
                </div>

                <div className="mission epic courier">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">1 Month</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">
                    <div className="days">2</div>
                    <div className="hours">6</div>
                    <div className="mins">2</div>
                  </div>
                  <div className="action">
                    <a className="button invert">Info</a>
                  </div>
                </div>

                <div className="mission epic supply">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">1 Month</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">
                    <div className="days">2</div>
                    <div className="hours">6</div>
                    <div className="mins">2</div>
                  </div>
                  <div className="action">
                    <a className="button invert">Info</a>
                  </div>
                </div>

                <div className="mission legendary liberation completed">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">3 Months</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">--</div>
                  <div className="action">Completed</div>
                </div>

                <div className="mission legendary recovery">
                  <div className="mtype">
                    <div className="icon"></div>
                  </div>
                  <div className="title">
                    <span>Mission Title</span>
                  </div>
                  <div className="duration">3 Months</div>
                  <div className="rewards">
                    <div className="icon trilium"></div>
                    <span className="amount">00000</span>
                  </div>
                  <div className="rarity">
                    <div className="icon nft"></div>
                  </div>
                  <div className="crafts">
                    <div className="icon craft"></div>
                    <span className="user"></span>
                    <span className="going">100</span>
                  </div>
                  <div className="departure">
                    <div className="days">2</div>
                    <div className="hours">6</div>
                    <div className="mins">2</div>
                  </div>
                  <div className="action">
                    <a className="button invert">Info</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="background">
        <div className="gradients grad1"></div>
        <div className="gradients grad2"></div>
        <div className="gradients graddiag1"></div>
        <div className="gradients graddiag2"></div>
        <div className="objects">
          <div className="grid"></div>
          <div className="lines"></div>
          <div className="dots"></div>
        </div>
        <div className="sky login"></div>
        <div className="sky centre active"></div>
        <div className="sky mission"></div>
        <div className="sky dashboard"></div>
        <div className="fade"></div>
      </div>
    </>
  );
};

export default Management;
