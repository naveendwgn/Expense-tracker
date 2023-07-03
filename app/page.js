'use client'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import {db} from './firebase'

export default function Home() {
  const [items, setItems] = useState([
   /* { name: 'Groceries', amount: 100 },
    { name: 'Gas', amount: 50 },
    { name: 'Dinner', amount: 200 }, */
  ]);
  const [newItem, setNewItem] = useState({ name: '', amount: '' });
  const [total, setTotal] = useState(0);

  // add items to db
  const addItems = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.amount !== '') {
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        amount: newItem.amount,
      });
      setNewItem({ name: '', amount: '' });
    }
  };
  // read items from db
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push( {...doc.data(), id: doc.id});
      });
      setItems(itemsArr);

      // read total from itemsarr
      const calculateTotal = () => {
        const totalAmount = itemsArr.reduce((sum, item) => sum += parseInt(item.amount), 0);
        setTotal(totalAmount);
      }
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

      // delete item from db
      const deleteItem = async (id) => {
        await deleteDoc(doc(db, "items", id));
      };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1
        className='text-4xl p-4 text-center'
        >Expense Tracker</h1>
        <div className="bg-[#20202066] rounded-lg p-4">
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
            onClick={addItems}
            className='text-white bg-[#53d2b4c3] hover:bg-[#53d2b4a9] p-3 text-xl'
            type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((items, index) => (
              <li key={index} className='my-4 w-full flex justify-between items-center p-3 bg-[#202121dd]'>
                <div
                className='p-4 w-full flex justify-between'
                >
                  <span>{items.name}</span>
                  <span>${items.amount}</span>
                </div>
                <button
                onClick={() => deleteItem(items.id)}
                className='text-white bg-[#53d2b4c3] hover:bg-[#53d2b4a9] p-4 ml-8 w-16'
                >X</button>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
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
