import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleSearch = (query: string) => {
    setSearchWord(query);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        setPhotos([]);
        setLoader(true);

        const response = await getPhotos(searchWord);

        if (response.length === 0) {
          return toast.error("No movies found for your request.");
        }
        setPhotos(response);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    if (searchWord.trim() !== "") {
      fetchData();
    }
  }, [searchWord]);

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          <Toaster />
          {loader && <Loader />}
          {error && (
            <Text>
              <ErrorMessage />
            </Text>
          )}

          <PhotosGallery photos={photos} onSelect={openModal} />
          {selectedPhoto && isModalOpen && (
            <Modal photo={selectedPhoto} onClose={closeModal} />
          )}
        </Container>
      </Section>
    </>
  );
}
