document.addEventListener("DOMContentLoaded", () => {
    
    // set error message and receipt section to invisible
    const receipt = document.querySelector("section");
    let error = document.getElementById("error-msg");
    error.style.display = "none";
    receipt.style.display = "none";


    // when calculate button is clicked
    document.getElementById("btn-cal").onclick = () => {

        // get user input
        const onPeakInput = document.getElementById("on-peak");
        const offPeakInput = document.getElementById("off-peak");
        const onPeak = Number(onPeakInput.value);
        const offPeak = Number(offPeakInput.value);

        // validate input data
        if (
            onPeak === undefined ||
            offPeak === undefined ||
            isNaN(onPeak) ||
            isNaN(offPeak) ||
            onPeak <= 0 ||
            offPeak <= 0
        ) {
            // print error message
            console.log("Please enter a positive number.");
            error.textContent = "Please enter a positive number.";
            error.style.display = "block";

            //clear input field
            onPeakInput.value = "";
            offPeakInput.value = "";
            return;
        }

        // validate select data
        const provinceSelect = document.getElementById("province");
        const selectedProvince = provinceSelect.value;
        if (selectedProvince === "") {

            // print error message
            console.log(`Please select a province.`);
            error.textContent = `Please select a province.`;
            error.style.display = "block";

            //clear input field
            onPeakInput.value = "";
            offPeakInput.value = "";
            return;
        }


        // once user data passes
        // show receipt section, hide error message
        error.style.display = "none";
        receipt.style.display = "block";
        onPeakInput.value = "";
        offPeakInput.value = "";

        //calculation
        const onPeakPrice = Number((0.132 * onPeak).toFixed(2));
        const offPeakPrice = Number((0.065 * offPeak).toFixed(2));
        const totalCsp = Number((onPeakPrice + offPeakPrice).toFixed(2));
        const tax = Number((totalCsp * 0.13).toFixed(2));

        let rebate;
        if (selectedProvince === "BC") {
            rebate = Number((totalCsp * 0.08).toFixed(2));
        } else {
            rebate = 0;
        }

        const totalPrice = Number((totalCsp + tax - rebate).toFixed(2));

        //console log fees
        console.log(`On Peak Charges: ${onPeakPrice}`);
        console.log(`Off Peak Charges: ${offPeakPrice}`);
        console.log(`Total Consumption Charges: ${totalCsp}`);
        console.log(`Sales Tax: ${tax}`);
        console.log(`Provincial Rebate: ${rebate}`);
        console.log(`YOU MUST PAY: ${totalPrice}`);

        // update HTML page
        // update peak usage fees
        document.getElementById("on-peak-price").innerHTML = `$${onPeakPrice}`;
        document.getElementById(
            "off-peak-price"
        ).innerHTML = `$${offPeakPrice}`;

        document.getElementById("on-peak-usage").innerHTML = `${onPeak}`;
        document.getElementById("off-peak-usage").innerHTML = `${offPeak}`;

        //update other-fees section
        document.getElementById(
            "other-fees-total-csp"
        ).innerHTML = `$${totalCsp}`;
        document.getElementById("other-fees-tax").innerHTML = `$${tax}`;
        document.getElementById("other-fees-rebate").innerHTML = `-$${rebate}`;

        //update total cost
        document.getElementById("total-price").innerHTML = `$${totalPrice}`;
    };
});
