"use client";

import React from "react";
import Modal from "./Modal";
import useCommentModal from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import useModal from "@/hooks/useModal";
import axios from "axios";

const CommentModal = () => {
  const { isModalOpen, id, closeModal } = useModal();
  const { user, logout } = useAuth();

  const handleOnComment = async (id: any, comment: string) => {
    try {
      const res = axios.post("/api/invoice/comment", {
        file: "MATE_H",
        pk01: id.pk01,
        pk02: id.pk02,
        pk03: id.pk03,
        user: user?.id,
        a530: comment,
      });
      toast.promise(res, {
        loading: "Loading",
        success: "Successfully Commented",
        error: "Failed to comment",
      });
    } catch (error: any) {
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
