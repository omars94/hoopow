import { BD } from '../components';
import '../App.scss';
import { HomeSideBar } from '../components/sidebar';
import { BD_List_TYPE } from '../types';

Home.defaultProps = {
  BDList: [],
};
export default function Home(props: { BDList: BD_List_TYPE }) {
  return (
    <>
      <HomeSideBar />
      <div className="BDList-container" id="scroll-container">
        {props.BDList.map((item, index) => (
          <BD {...item} key={index} />
        ))}
      </div>
    </>
  );
}
