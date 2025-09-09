import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  onSelect: (photo: Photo) => void;
  photos: Photo[];
}

export default function PhotosGallery({
  onSelect,
  photos,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((el) => (
        <GridItem key={el.id}>
          <PhotosGalleryItem photo={el} onClick={() => onSelect(el)} />
        </GridItem>
      ))}
    </Grid>
  );
}
