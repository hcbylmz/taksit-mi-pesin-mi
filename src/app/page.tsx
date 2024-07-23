"use client";
import Image from "next/image";
import { SetStateAction, useState } from "react";

// create typescript types
type InstallmentDetails = {
  installmentNumber: number;
  installmentAmount: number;
  remainingMoney: number
}
export default function Home() {

  const [interestPeriod, setInterestPeriod] = useState("Aylık");
  const [interestRate, setInterestRate] = useState(3.89);
  const [initialPayment, setInitialPayment] = useState(10000);
  const [totalInstallment, setTotalInstallment] = useState(11000);
  const [numberOfInstallments, setNumberOfInstallments] = useState(5);

  const monthlyInstallmentAmount = totalInstallment / numberOfInstallments

  const installmentDetails: InstallmentDetails[] = []

  const handleSelectInterestPeriod = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInterestPeriod(event.target.value);
  }

  const adjustRemainingMoney = () => {

    let tempValue = initialPayment;
    for (let i = 0; i < numberOfInstallments; i++) {
      tempValue = tempValue * ((1 + interestRate / 100)) - monthlyInstallmentAmount

      installmentDetails.push({
        installmentNumber: i + 1,
        installmentAmount: monthlyInstallmentAmount,
        remainingMoney: tempValue
      })

    }

  }

  adjustRemainingMoney()

  const isItReadyToRender = () => {
    console.log(isNaN(initialPayment))
    if (interestPeriod === "" || isNaN(initialPayment) || isNaN(totalInstallment) || isNaN(numberOfInstallments)) {

      return false
    }

    return true
  }

  const isSuccess = installmentDetails?.[installmentDetails?.length - 1]?.remainingMoney > 0


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="flex flex-col gap-4">
        <select name="interests" id="interest-select" value={interestPeriod} onChange={handleSelectInterestPeriod}>
          <option value="" >--Faiz vadesini seçin--</option>
          <option value="Aylık">Aylık</option>
          <option value="Yıllık">Yıllık</option>
        </select>
        <label>Faiz oranı</label>
        <input value={interestRate} onChange={(e) => setInterestRate(e.target.value)} type="number" />
        <label>Peşin ödeme tutarı</label>
        <input value={initialPayment} onChange={(e) => setInitialPayment(e.target.value)} type="number" />
        <label>Taksitli toplam tutar</label>
        <input value={totalInstallment} onChange={(e) => setTotalInstallment(e.target.value)} type="number" />
        <label>Kaç taksit?</label>
        <input value={numberOfInstallments} onChange={(e) => setNumberOfInstallments(e.target.value)} type="number" />

      </div>

      <div>

      </div>
      <div className={`p-2 ${isSuccess ? "bg-gradient-to-r from-green-500" : "bg-gradient-to-r from-red-500"} rounded-md`}>
        {isItReadyToRender() && installmentDetails.reverse().map((installment, index) => {

          return (
            <div key={index} className={"flex gap-4 justify-between "} >
              <p>{installment.installmentNumber}. ay sonunda</p>
              {/* <p>{installment.monthlyInstallmentAmount}</p> */}
              <p>{installment.remainingMoney.toFixed(2)} TL</p>

            </div>
          )
        })}
      </div>
    </main>
  );
}
