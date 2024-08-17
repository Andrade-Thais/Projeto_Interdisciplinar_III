import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { slides } from '../../../../../db.json';
import 'yet-another-react-lightbox/styles.css';
import {
  Captions,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Images from './Images';
import NavBar from '../Navbar/NavBar';
import Footer from '../Sections/Footer';
import { useFetch } from '../../../../hooks/useFetch';

function Galeria() {
  // const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  const response = useFetch("../../db.json");
  const navbarData = response && response.navbar ? response.navbar : [];
  return (
    <>
    <NavBar data={navbarData}/>
    
      {}

      <Images
        data={slides}
        onClick={(currentIndex) => setIndex(currentIndex)}
      />

      <Lightbox
        plugins={[Captions, Fullscreen, Zoom, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'end',
        }}
        

        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
      <Footer/>
    </>
  );
}

export default Galeria;