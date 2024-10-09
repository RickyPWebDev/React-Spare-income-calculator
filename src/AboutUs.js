import React, { useState } from 'react';
import './aboutUs.css';

function AboutUs() {
    // State to track the income
    const [income, setIncome] = useState(0);

    // State to track the list of bills (each bill has a name and amount)
    const [bills, setBills] = useState([{ name: '', amount: 0 }]);

    // State to store the calculated result
    const [howMuchLeft, setHowMuchLeft] = useState(null);

    // Function to handle adding a new bill input field
    const addBill = () => {
        setBills([...bills, { name: '', amount: 0 }]);
    };

    // Function to handle updating bill fields (either name or amount)
    const handleBillChange = (index, field, value) => {
        const updatedBills = [...bills];
        updatedBills[index][field] = field === 'amount' ? parseFloat(value) : value;
        setBills(updatedBills);
    };

    // Function to remove a bill from the list
    const removeBill = (index) => {
        const updatedBills = bills.filter((_, i) => i !== index); // Remove the selected bill
        setBills(updatedBills);
    };

    // Function to calculate remaining income after bills
    const incomeCalculate = () => {
        const totalBills = bills.reduce((acc, bill) => acc + (bill.amount || 0), 0);
        const remaining = Math.round(income - totalBills);
        setHowMuchLeft(remaining);
    };

    return (
        <div className="background">
            <h1>This is a website I built completely using React.js. It will calculate my expendable income after bills.</h1>
            
            <form className="form-container"> 
                <label>Enter income after deductions:</label>
                <input 
                    type="number" 
                    id="income" 
                    value={income} 
                    onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} // Ensure the income is a number
                />

                <h2>Bills:</h2>
                {bills.map((bill, index) => (
                    <div key={index}>
                        <input 
                            type="text" 
                            placeholder="Bill name" 
                            value={bill.name} 
                            onChange={(e) => handleBillChange(index, 'name', e.target.value)} 
                        />
                        <input 
                            type="number" 
                            placeholder="Amount" 
                            value={bill.amount} 
                            onChange={(e) => handleBillChange(index, 'amount', e.target.value)} 
                        />
                        {/* Add a button to remove the bill */}
                        <button type="button" onClick={() => removeBill(index)}>Remove</button>
                    </div>
                ))}

                <button type="button" onClick={addBill}>Add Bill</button>
                <button type="button" onClick={incomeCalculate}>Calculate</button>
            </form>

            {/* Conditionally render the result if available */}
            {howMuchLeft !== null && (
                <h2 className="output">Your expendable income after bills is: £{howMuchLeft}</h2>
            )}
        </div>
    );
}

export default AboutUs;
