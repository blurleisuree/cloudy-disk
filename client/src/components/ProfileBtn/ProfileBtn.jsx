import profileSvg from "../../assets/profile.svg";

function ProfileBtn({ className, onClick }) {
  return <img src={profileSvg} alt="profileBtn" className={className} onClick={onClick}/>;
}

export default ProfileBtn;
