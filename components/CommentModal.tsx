"use client";

import React from "react";
import Modal from "./Modal";
import useCommentModal from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import useModal from "@/hooks/useModal";

const CommentModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const { user, logout } = useAuth();

  const handleOnComment = async (id: number, comment: string) => {
    try {
      const res = await fetch(`/api/invoice/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employmentId: user?.id,
          comment: comment,
        }),
      });
      const response = await res.json();
      toast.success(response.message);
    } catch (error: any) {
      //TODO: handle error
      toast.error(error.message);
    }
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="w-96">
        <h1 className="font-bold text-2xl">Add comment</h1>
        <textarea className="w-full rounded-md mt-4 h-48 p-2 bg-transparent" placeholder="Comment..."></textarea>
        <button className="mt-4 w-full text-center rounded-md bg-black bg-opacity-20 hover:bg-opacity-30 py-2 border border-edge-dark">Submit</button>
      </div>
    </Modal>
  );
};

export default CommentModal;
