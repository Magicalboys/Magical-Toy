import React, {useState} from 'react';

interface Props {
    item: {id: string, name: string};
    onEdit: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export const MenuItem = ({item, onEdit, onDelete} : any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const [editedText, setEditedText] = useState(item.name);

    const handleEdit = () => {
        if (editedText.trim()) {
            onEdit(item.id, editedText);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        handleEdit();
    };

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <span>{item.name}</span>
            )}

            {isEditing ? (
                <div>
                    <button onClick={handleEdit}>✓</button>
                    <button onClick={() => setIsEditing(false)}>×</button>
                </div>
            ) : (
                hover && (
                    <div>
                        <button onClick={() => setIsEditing(true)}>1</button>
                        <button onClick={() => onDelete(item.id)}>2</button>
                    </div>
                )
            )}
        </div>
    );
};
