import React, { useEffect, useRef, useState } from "react";
import kebabIcon from "../assets/kebab-icon.png";
import "../assets/styles/KebabMenu.css";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

export default function KebabMenu({
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close when clicking outside / Esc
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open]);

  // Focus first item when opened
  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector("button");
      first && first.focus();
    }
  }, [open]);

  return (
    <div className="kebab">
      <button ref={btnRef} className="kebab-trigger" onClick={() => setOpen((v) => !v)} type="button">
          <img className="kebab-icon" width="18" height="18" src={kebabIcon} alt="Kebab menu icon" />
      </button>

      {open && (
        <div ref={menuRef} role="menu" className="kebab-menu">
          <button role="menuitem" className="kebab-item" onClick={() => { setOpen(false); onEdit?.(); }}
            type="button"> <span>Edit</span> <span><img src={editIcon} alt="Edit icon"  width="18" height="18"/></span>
          </button>

          <button role="menuitem" className="kebab-item danger" onClick={() => { setOpen(false); onDelete?.(); }}
            type="button" > <span>Delete</span> <span><img src={deleteIcon} alt="Delete icon" width="18" height="18"/></span>
          </button>
        </div>
      )}
    </div>
  );
}
