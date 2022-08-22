import { useWeb3Contract } from "react-moralis";
import { contractAddreses, abi } from "../artifacts";
import { useMoralis } from "react-moralis";
import { useNotification } from "@web3uikit/core";
import { useEffect } from "react";
import { useState } from "react";
import { ethers } from "ethers";

function LotteryEntrance(props) {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const [entranceFee, setEntranceFee] = useState("0");
  const [numbPlayers, setNumbPlayers] = useState("0");
  const dispatch = useNotification();

  const chainId = parseInt(chainIdHex);
  const lotteryAddress =
    chainId in contractAddreses ? contractAddreses[chainId][0] : null;

  const {
    runContractFunction: enterLottery,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "enter",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntraceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getEntraceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const updateUI = async () => {
    const entranceFeeFromContract = await getEntraceFee();
    const feeInWei = entranceFeeFromContract.toString();
    const numbPlayersFromContract = await getNumberOfPlayers();
    setEntranceFee(feeInWei);
    setNumbPlayers(numbPlayersFromContract.toString());
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  async function handleSuccess(tx) {
    await tx.wait(1);
    handleNotification(tx);
    updateUI();
  }

  const handleNotification = (tx) => {
    dispatch({
      type: "info",
      message: "Transaction Completed!.",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div>
      {lotteryAddress ? (
        <div>
          <p>
            Entrance fee {ethers.utils.formatUnits(entranceFee, "ether")} ethers
          </p>

          <p>Number of Players: {numbPlayers}</p>

          <button
            onClick={async () => {
              await enterLottery({
                onSuccess: handleSuccess,
                onError: (error) => {
                  console.log(error);
                },
              });
            }}
            disabled={isLoading || isFetching}
          >
            {isFetching || isLoading ? "Loading..." : "Enter Lottery"}
          </button>
        </div>
      ) : (
        <p>No Lottery Contract found on {chainId} chaindId</p>
      )}
    </div>
  );
}

export default LotteryEntrance;
