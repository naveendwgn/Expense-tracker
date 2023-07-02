'use client'
import React, { useState, useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore"; 

export default function Home() {
  const [expenses, setExpenses] = useState([
    { name: 'Groceries', amount: 100 },
    { name: 'Gas', amount: 50 },
    { name: 'Dinner', amount: 200 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', amount: '' });
  const [total, setTotal] = useState(0);

  const addExpense = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.amount !== '') {
      setExpenses([...expenses, newItem])
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1
        className='text-4xl p-4 text-center'
        >Expense Tracker</h1>
        <div className="bg-slate-800 rounded-lg p-4">
          <form
          className='grid grid-cols-6 items-center text-black'
          >
            <input 
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className='col-span-3 p-3 border' 
            type="text" 
            placeholder='Enter item' 
            />
            <input 
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
            className='col-span-2 p-3 border mx-3' 
            type="text" 
            placeholder='Enter $' 
            />
            <button 
            onClick={addExpense}
            className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
            type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className='my-4 w-full flex justify-between items-center p-3 bg-slate-950'>
                <div
                className='p-4 w-full flex justify-between'
                >
                  <span>{expense.name}</span>
                  <span>${expense.amount}</span>
                </div>
                <button
                className='text-white bg-slate-900 hover:bg-slate-800 p-4 ml-8 w-16'
                >X</button>
              </li>
            ))}
          </ul>
          {expenses.length > 0 && (
            <div className='p-4 w-full flex justify-between'>
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
