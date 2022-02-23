import { useEffect, useState } from "react";

import { LockIcon } from "@chakra-ui/icons";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { TriliumIcon } from "components/ui/Icons";
import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint64", name: "id", type: "uint64" },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "string", name: "to", type: "string" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "Teleport",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenOwner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "remaining", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "tokens", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "tokens", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "approveAndCall",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "tokenOwner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "sigData", type: "bytes" },
      { internalType: "bytes[]", name: "signatures", type: "bytes[]" },
    ],
    name: "claim",
    outputs: [{ internalType: "address", name: "toAddress", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    name: "claimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "newOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "oracles",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "message", type: "bytes32" },
      { internalType: "bytes", name: "sig", type: "bytes" },
    ],
    name: "recoverSigner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOracle", type: "address" }],
    name: "regOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "sig", type: "bytes" }],
    name: "splitSignature",
    outputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes32", name: "", type: "bytes32" },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "to", type: "string" },
      { internalType: "uint256", name: "tokens", type: "uint256" },
      { internalType: "uint256", name: "chainid", type: "uint256" },
    ],
    name: "teleport",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "thisChainId",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "threshold",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokens", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "tokens", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokens", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_remOracle", type: "address" }],
    name: "unregOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "newChainId", type: "uint8" }],
    name: "updateChainId",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "newThreshold", type: "uint8" }],
    name: "updateThreshold",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const awAddress = "0x2222227E22102Fe3322098e4CBfE18cFebD57c95";

const BinanceTrilium = () => {
  const [balance, setBalance] = useState<BigNumber>();

  const { account, library, chainId, activate } = useWeb3React<Web3Provider>();

  useEffect(() => {
    activate(new InjectedConnector({}));
  }, [activate]);

  function loadBalance() {
    if (!!account && !!library) {
      const tlm20 = new ethers.Contract(awAddress, ABI, library);
      tlm20.balanceOf(account).then((res: BigNumber) => {
        setBalance(res);
      });
    }
  }

  // eslint-disable-next-line consistent-return
  useEffect(loadBalance, [account, library, chainId]);

  return (
    <Flex alignItems="flex-start" color="#efb809" onClick={loadBalance}>
      <Box w="41px" position="relative" fill="#efb809">
        <Icon
          as={LockIcon}
          w="18px"
          height="auto"
          position="absolute"
          right={-1}
          top={0}
          zIndex={2}
        />
        <TriliumIcon />
      </Box>
      <Flex direction="column" ml={4}>
        <Text
          fontSize="2xl"
          lineHeight={1}
          fontFamily="Orbitron"
          color="#efb809"
        >
          {balance === null && "Connect"}
          {balance ? `${formatUnits(balance, 4)}` : "0"}
        </Text>
        <Text
          fontFamily="Titillium Web"
          fontWeight="bold"
          fontSize="sm"
          color="#989898"
          letterSpacing="0.1em"
        >
          Binance Trilium
        </Text>
      </Flex>
    </Flex>
  );
};

export { BinanceTrilium };
