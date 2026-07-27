"use client";
import { useState } from "react";
import { NavType } from "@/data/navData";
import { createClient } from "@/lib/client";
import { Book } from "@/types/BookType";
import Overlay from "./Modals/Overlay";
import Modal from "./Modals/Modal";
import CharacterModal from "./Modals/CharacterModal";
import InspirationModal from "./Modals/InspirationModal";
import KingdomModal from "./Modals/KingdomModal";
import PantheonModal from "./Modals/PantheonModal";
import MythModal from "./Modals/MythModal";

const modalMap: Record<string, any> = {
  characters: CharacterModal,
  inspirations: InspirationModal,
  kingdoms: KingdomModal,
  pantheon: PantheonModal,
  myths: MythModal,
};

export default function Table<T extends { id: number }>({ nav, book }: { nav: NavType; book: Book<T>; }) {

  const { title, icon, description } = nav;
  const { headings, data, empty } = book;
  const single = title[title.length - 1] === "s" ? title.slice(0, -1) : "Deity";

  const [bookData, setBookData] = useState<T[]>(data);
  const [form, setForm] = useState<T>(empty);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const ModalComponent = modalMap[nav.title.toLowerCase()];

  function openCreate() {
    setForm({ ...empty })
    setEditing(false);
    setOpenModal(true);
  }

  function openEdit(d: T) {
    setForm({ ...empty, ...d });
    setEditing(true);
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
    setEditing(false);
    setForm({ ...empty });
  }

  async function handleDelete(id: number | null) {
    if (!id) return;
    const supabase = createClient();
    await supabase.from(title.toLowerCase()).delete().eq("id", id);
    setBookData(prev => prev.filter(item => item.id !== id));
    setConfirmDelete(null);
  }

  return (
    <>
      <section id={title.toLowerCase()} className="!py-0 scroll-mt-35">
        <div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[oklch(0.92_0.040_25)]">
                  <i className={`${icon} text-[oklch(0.26_0.110_25)] text-xl`}></i>
                </div>
                <span className="text-xs tracking-[0.4em] uppercase font-display text-[oklch(0.50_0.120_76)]">{bookData.length} Entries</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl my-2">{title}</h2>
              <p className="italic text-foreground-light">{description}</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-3 rounded-md bg-[oklch(0.50_0.170_25)] hover:bg-[oklch(0.42_0.160_25)] text-card text-xs tracking-[0.3em] font-display uppercase transition-colors cursor-pointer" onClick={openCreate}><i className="ri-add-line text-base"></i>Add {single}</button>
          </div>
          <div className="mt-10 border border-border rounded-lg overflow-auto">
            <table className="w-full text-left bg-card">
              <thead className="bg-background-light font-display text-xs uppercase text-foreground-light tracking-widest">
                <tr>
                  <th className="px-5 py-3.5"><i className="ri-hashtag font-medium"></i></th>
                  {headings.map((h, index) => (
                    <th key={index} className="px-5 py-3.5">{h}</th>
                  ))}
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-foreground-dark">
                {bookData.map((d, index) => (
                  <tr key={index} className="border-t border-border/60">
                    <td className="px-5 py-4">{index + 1}</td>
                    {headings.map((h, i) => {
                      const key = h.toLowerCase() as keyof T;
                      return (
                        <td key={i} className="px-5 py-4">{d[key] && typeof d[key] === "object" ? Object.values(d[key])[1] : String(d[key] ?? "")}</td>
                      );
                    })}
                    <td className="px-5 py-4 flex justify-end gap-5">
                      <i className="ri-pencil-line hover:text-[oklch(0.50_0.170_25)] cursor-pointer transition-colors" onClick={() => openEdit(d)}></i>
                      <i className="ri-delete-bin-line hover:text-[oklch(0.50_0.170_25)] cursor-pointer transition-colors" onClick={() => setConfirmDelete(d.id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Overlay openValue={openModal}>
        <Modal title={single} edit={isEditing} closeModal={closeModal}>
          <ModalComponent title={single} form={form} setForm={setForm} setBookData={setBookData} closeModal={closeModal} />
        </Modal>
      </Overlay>
      <Overlay openValue={confirmDelete !== null}>
        <div className="bg-card max-w-sm rounded-lg p-6 border border-border/70">
          <h3 className="text-lg text-foreground-dark">Delete {single}?</h3>
          <p className="text-sm text-foreground-light mt-2 mb-6">This action cannot be undone. The {single.toLowerCase()} will be permanently removed from the archive.</p>
          <div className="flex justify-end gap-3 text-sm uppercase font-display tracking-widest">
            <button type="button" className="px-5 py-2.5 rounded-md border border-border hover:bg-background-light text-foreground-light transition-colors cursor-pointer" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button type="button" className="px-5 py-2.5 rounded-md bg-[oklch(0.50_0.170_25)] hover:bg-[oklch(0.42_0.160_25)] text-card transition-colors cursor-pointer" onClick={() => handleDelete(confirmDelete)}>Delete</button>
          </div>
        </div>
      </Overlay>
    </>
  );
}