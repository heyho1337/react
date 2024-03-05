"use client";
import { useState } from 'react';

function Dialog({ text, closeFn }: { text: string, closeFn: (event: any) => void }) {
    const [dialogId] = useState(generateRandomId());

    function generateRandomId() {
        return Math.random().toString(36).substring(2, 12);
    }

	function handleClose() {
		closeFn();
        const dialog = document.getElementById(dialogId);
        if (dialog) {
			dialog.remove();
        }
    }

    return (
        <>
            <dialog open id={dialogId}>
                <p>{text}</p>
                <button className="closeButton" autoFocus onClick={handleClose}>Close</button>
            </dialog>
        </>
    );
}

export default Dialog;