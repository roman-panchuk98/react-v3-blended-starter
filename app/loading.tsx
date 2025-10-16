import { FadeLoader } from 'react-spinners';
import css from './loading.module.css';
export default function Loading() {
  return (
    <div className={css.backdrop}>
      <FadeLoader color="blue" />{' '}
    </div>
  );
}
