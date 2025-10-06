import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import toast from "react-hot-toast";

export interface PostFormValuesProps {
  title: string;
  body: string;
}

export interface PostFormProps {
  onClose: () => void;
}

const initialValues: PostFormValuesProps = {
  title: "",
  body: "",
};

export const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Title is required"),
  body: Yup.string().max(500, "Too long").required("Content is required"),
});

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: async ({ title, body }: PostFormValuesProps) => {
      const res = await createPost({ title, body });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      toast.success("Post created successfully!");
    },
  });

  const handleCreateNote = ({ title, body }: PostFormValuesProps) => {
    mutationPost.mutate({ title, body });
  };

  const handleSubmit = (
    values: PostFormValuesProps,
    actions: FormikHelpers<PostFormValuesProps>
  ) => {
    handleCreateNote(values);
    onClose();
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OrderFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutationPost.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
