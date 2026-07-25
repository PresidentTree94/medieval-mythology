"use client";
import { useState } from "react";
import { NavType } from "@/data/navData";
import Modal from "./Modals/Modal";
import CharacterModal from "./Modals/CharacterModal";
import KingdomModal from "./Modals/KingdomModal";
import PantheonModal from "./Modals/PantheonModal";
import MythModal from "./Modals/MythModal";

const modalMap: Record<string, any> = {
  characters: CharacterModal,
  kingdoms: KingdomModal,
  pantheon: PantheonModal,
  myths: MythModal,
};

export default function Table<T>({ nav, book }: {
  nav: NavType;
  book: {
    headings: string[];
    data: T[];
    empty: T
  };
}) {

  const { title, icon, description } = nav;
  const { headings, data, empty } = book;
  const single = title[title.length - 1] === "s" ? title.slice(0, -1) : "Diety";

  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState<T>(empty);
  const [isEditing, setIsEditing] = useState(false);

  const ModalComponent = modalMap[nav.title.toLowerCase()];

  function openCreate() {
    setForm({ ...empty })
    setIsEditing(false);
    setOpenModal(true);
  }

  function openEdit(d: T) {
    setForm({ ...d });
    setIsEditing(true);
    setOpenModal(true);
  }

  return (
    <>
      <section id={title.toLowerCase()} className="!py-0">
        <div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[oklch(0.92_0.040_25)]">
                  <i className={`${icon} text-[oklch(0.26_0.110_25)] text-xl`}></i>
                </div>
                <span className="text-xs tracking-[0.4em] uppercase font-display text-[oklch(0.50_0.120_76)]">{data.length} Entries</span>
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
                {data.map((d, index) => (
                  <tr key={index} className="border-t border-border/60">
                    <td className="px-5 py-4">{index + 1}</td>
                    {headings.map((h, i) => {
                      const key = h.toLowerCase() as keyof T;
                      return (
                        <td key={i} className="px-5 py-4">{d[key] ? String(d[key]) : ""}</td>
                      );
                    })}
                    <td className="px-5 py-4 flex justify-end gap-5">
                      <i className="ri-pencil-line cursor-pointer" onClick={() => openEdit(d)}></i>
                      <i className="ri-delete-bin-line cursor-pointer"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal title={single} edit={isEditing} open={openModal} setOpen={setOpenModal}>
        <ModalComponent title={single} form={form} setForm={setForm} />
      </Modal>
    </>
  );
}