import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/Supabase'


export default function Smoothie({ smoothie, onDelete }) {
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id).select()

        if (error) {
            console.log(error)
        }
        if (data) {
            onDelete(smoothie.id)
            console.log(data)
        }
    }

    return (
        <div className="smoothie-card">
            <h2>{smoothie.title}</h2>
            <p>{smoothie.method}</p>
            <div className="rating">
                {smoothie.rating}
            </div>
            <div className="buttons">
                <Link to={"/" + smoothie.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}
