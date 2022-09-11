import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import TodosAPI from "../services/TodosApi";
import moment from "moment";

function TodoList(props) {   

    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [loading, setLoading] = useState(true);

    // Permet d'aller récupérer les todos
    const fetchTodos = async () => {
        try {
            const data = await TodosAPI.findAll();
            setTodos(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les todos");
        }
    };

    // Au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchTodos();
    }, []);
    
    // Gestion de la suppression d'un customer
    const handleDelete = async id => {
        const originalTodos = [...todos];
        setTodos(todos.filter(todo => todo.id !== id));
        try {
            await TodosAPI.delete(id);
            toast.success("La todo a bien été supprimé");
        } catch (error) {
            setTodos(originalCustomers);
            toast.error("La suppression n'a pas pu fonctionner");
        }
    };

    const handlePageChange = page => setCurrentPage(page);

    // Pagination des données
    const paginatedTodos = Pagination.getData(
        todos,
        currentPage,
        itemsPerPage
    );

    // Gestion du format de date
    const formatDate = str => moment(str).format("DD/MM/YYYY | H:m:s");

    return (
        <>
            <div className="bg-slate-50">
                <div className="w-full container flex flex-col justify-center">
                    <form className="bg-white mt-12 p-6 py-10 rounded-md">
                        <h1 className="text-2xl font-bold mt-2 text-center text-gray-600">Ready to get started? Write Me a Todo!</h1>
                        <div className="mt-6 flex w-full gap-2">
                            <input type="number" placeholder="0" min="0" className="cursor-pointer bg-gray-100 w-10 text-center rounded-xl pl-2 outline-none py-2 border-2" />
                            <input placeholder="write her..." className="w-100 bg-gray-100 rounded-xl py-2 px-4 border-2 outline-none"/>
                        </div>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-50 mt-4 px-4 py-2 rounded-xl w-full items-center text-center gap-2">
                            Send
                        </button>
                    </form>
                    <div className="relative justify-center">                           
                        <ul>
                            {paginatedTodos.map(todo => (
                                <li key={todo.id}>            
                                    <div className="relative flex top-8 right-0 p-3 space-x-1">
                                        {/* <button className="absolute top-10 right-10">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </span>
                                        </button> */}
                                        <button onClick={() => handleDelete(todo.id)} className="absolute top-10 right-2">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </span>                                    
                                        </button>
                                    </div>
                                    <span className="relative -left-2 top-5 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">
                                        {todo.priority}
                                    </span>
                                    <p className="bg-white px-12 py-12 rounded-lg">
                                        <strong>{todo.title}</strong>
                                        <br />
                                        {todo.content}
                                    </p>
                                    <div className="relative -top-12 p-3 mb-2"> 
                                        {formatDate(todo.createdAt)}
                                    </div>
                                </li> 
                            ))}                               
                        </ul>                        
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={todos.length}
                    onPageChanged={handlePageChange}
                />
            </div>
        </>
    );
}

export default TodoList;