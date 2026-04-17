"use client";

import { BsPlus } from "react-icons/bs";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

interface Props {
  isFaculty: boolean;
  moduleId: string;
  onEditModule: (moduleId: string) => void;
  onDeleteModule: (moduleId: string) => void;
}

export default function ModuleControlButtons({
  isFaculty,
  moduleId,
  onEditModule,
  onDeleteModule,
}: Props) {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      {isFaculty && (
        <>
          <button
            className="btn btn-link text-dark p-0"
            onClick={() => onEditModule(moduleId)}
            aria-label="Edit Module"
          >
            <FaPencilAlt />
          </button>
          <button
            className="btn btn-link text-danger p-0"
            onClick={() => onDeleteModule(moduleId)}
            aria-label="Delete Module"
          >
            <FaTrashAlt />
          </button>
        </>
      )}
      <BsPlus className="fs-4" />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
