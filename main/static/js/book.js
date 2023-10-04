document.addEventListener('DOMContentLoaded', () => {
    flight_duration();
});

function flight_duration() {
    document.querySelectorAll(".duration").forEach(element => {
        let time = element.dataset.value.split(":");
        element.innerText = time[0]+"h "+time[1]+"m";
    });
}

let coupon_source = null;


function add_traveller() {
    let div = document.querySelector('.add-traveller-div');
    let fname = div.querySelector('#fname');
    let lname = div.querySelector('#lname');
    let gender = div.querySelectorAll('.gender');
    let gender_val = null
    if(fname.value.trim().length === 0) {
        alert("Please enter First Name.");
        return false;
    }

    if(lname.value.trim().length === 0) {
        alert("Please enter Last Name.");
        return false;
    }

    if (!gender[0].checked) {
        if (!gender[1].checked) {
            alert("Please select gender.");
            return false;
        }
        else {
            gender_val = gender[1].value;
        }
    }
    else {
        gender_val = gender[0].value;
    }

    let passengerCount = div.parentElement.querySelectorAll(".each-traveller-div .each-traveller").length;

    let traveller = `<div class="row each-traveller">
                        <div>
                            <span class="traveller-name">${fname.value} ${lname.value}</span><span>,</span>
                            <span class="traveller-gender">${gender_val.toUpperCase()}</span>
                        </div>
                        <input type="hidden" name="passenger${passengerCount+1}FName" value="${fname.value}">
                        <input type="hidden" name="passenger${passengerCount+1}LName" value="${lname.value}">
                        <input type="hidden" name="passenger${passengerCount+1}Gender" value="${gender_val}">
                        <div class="delete-traveller">
                            <button class="btn" type="button" onclick="del_traveller(this)">
                                <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                    </div>`;
    div.parentElement.querySelector(".each-traveller-div").innerHTML += traveller;
    div.parentElement.querySelector("#p-count").value = passengerCount+1;
    div.parentElement.querySelector(".traveller-head h6 span").innerText = passengerCount+1;
    div.parentElement.querySelector(".no-traveller").style.display = 'none';
    fname.value = "";
    lname.value = "";
    gender.forEach(radio => {
        radio.checked = false;
    });

    let pcount = document.querySelector("#p-count").value;
    let fare = document.querySelector("#basefare").value;
    let fee = document.querySelector("#fee").value;
    if (parseInt(pcount)!==0) {
        document.querySelector(".base-fare-value span").innerText = parseInt(fare)*parseInt(pcount);
        document.querySelector(".total-fare-value span").innerText = (parseInt(fare)*parseInt(pcount))+parseInt(fee);
    }
    coupon_source = 'Passenger_btn';
    setTimeout(() => {
        check_coupon();
    }, 100);

}

function del_traveller(btn) {
    let traveller = btn.parentElement.parentElement;
    let tvl = btn.parentElement.parentElement.parentElement.parentElement;
    let cnt = tvl.querySelector("#p-count");
    cnt.value = parseInt(cnt.value)-1;
    tvl.querySelector(".traveller-head h6 span").innerText = cnt.value;
    if(parseInt(cnt.value) <= 0) {
        tvl.querySelector('.no-traveller').style.display = 'block';
    }
    traveller.remove();
    
    // let pcount = document.querySelector("#p-count").value;
    let fare = document.querySelector("#basefare").value;
    let fee = document.querySelector("#fee").value;
    if (parseInt(cnt.value) >= 0) {
        document.querySelector(".base-fare-value span").innerText = parseInt(fare)*parseInt(cnt.value);
        document.querySelector(".total-fare-value span").innerText = (parseInt(fare)*parseInt(cnt.value))+parseInt(fee);

    }
    coupon_source = 'passenger_btn';
    setTimeout(() => {
        check_coupon();
    }, 100);
}

function book_submit() {
    let pcount = document.querySelector("#p-count");
    if(parseInt(pcount.value) > 0) {
        return true;
    }
    alert("Please add atleast one passenger.")
    return false;
}

function coupon_call(){
    coupon_source = 'coupon_btn';
    check_coupon();
}

function check_coupon(){
    ccode = document.querySelector("#coupon_code_div input[type='text']").value;
    if(ccode.trim().length === 0) {
        if (coupon_source === 'coupon_btn') {
            alert("Please enter coupon code.");
            return false;
        }
        else{
            return false;
        }
    }
    else{
        fetch(`flight/coupon/check/${ccode}`)
        .then(res => res.json())
        .then(data => {
            if (data['success'] === true) {
                let divv = document.querySelector(".discounts");
                let basefare = document.querySelector("#basefare").value;
                let pcount = document.querySelector("#p-count").value;
                basefare = basefare*pcount;
                let fee = document.querySelector("#fee").value;
                discount_percent = parseFloat(data['discount'])/100;
                let discount_amt = parseFloat(basefare)*discount_percent;
                let final_amt = parseFloat(basefare)-discount_amt+parseFloat(fee);
                let content = `
                <div class="discount-label">Discount: </div>
                <div class="discount-value" style="color:green;">(-) ₹ <span>${discount_amt}</span></div>
                `;
                divv.innerHTML = content;
                document.querySelector(".total-fare-value span").innerText = final_amt;
                let ccbox = document.querySelector("#cc_box");
                let ddiv = document.createElement("div");
                ddiv.classList.add("col");
                ddiv.classList.add("coupon-apply");
                ddiv.setAttribute("id", "coupon-message-box");
                ddiv.setAttribute("style", "padding: 10px 10px 10px 0px; color:green; font-size:0.8em;");
                ddiv.innerHTML = `
                <center>
                    "Congratulations! You applied ${data['discount']}% discount on your booking."
                </center>`;
                document.querySelectorAll("#coupon-message-box").forEach(div => {
                    div.remove();
                });
                ccbox.appendChild(ddiv);
            }
            else {
                if (coupon_source === 'coupon_btn') {
                    alert("Invalid coupon code.");
                    return false;
                }
                else{
                    return false;
                }
            }
        });
    }
}
