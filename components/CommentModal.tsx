"use client";

import React from "react";
import Modal from "./Modal";
import useCommentModal from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import useModal from "@/hooks/useModal";

const CommentModal = () => {
  const { isModalOpen, id, closeModal } = useModal();
  const { user, logout } = useAuth();

  const handleOnComment = async (id: string, comment: string) => {
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
    } finally {
      closeModal();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Accessing the value of the comment input field
    const comment = (e.target as any).elements.comment.value;

    handleOnComment(id, comment);
   
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="w-96">
        <h1 className="font-bold text-2xl">Add comment</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full rounded-md mt-4 h-48 p-2 bg-transparent"
            name="comment"
            id="comment"
            placeholder="Comment..."
          ></textarea>
          <button
            type="submit"
            className="mt-4 w-full text-center rounded-md bg-black bg-opacity-20 hover:bg-opacity-30 py-2 border border-edge-dark"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;
