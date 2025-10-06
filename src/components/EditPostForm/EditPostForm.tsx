import css from "./EditPostForm.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { OrderFormSchema, PostFormProps } from "../CreatePostForm/CreatePostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost, EditPostProps } from "../../services/postService";
import toast from "react-hot-toast";

interface EditPostFormProps extends PostFormProps {
  post: EditPostProps;
}

export default function EditPostForm({ onClose, post }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: async ({ id, title, body }: EditPostProps) => {
      const res = await editPost({ id, title, body });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post edited successfully!");
    },
  });

  const handleCreateNote = ({ id, title, body }: EditPostProps) => {
    mutationPost.mutate({ id, title, body });
  };

  const handleSubmit = (values: EditPostProps, actions: FormikHelpers<EditPostProps>) => {
    handleCreateNote(values);
    onClose();
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={post}
      enableReinitialize
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
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutationPost.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
