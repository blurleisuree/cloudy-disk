import logoCloudy from "../../../../assets/icons/logo_cloudy.svg";
import logoBoth from "../../../../assets/icons/logo_both.svg";
import logoText from "../../../../assets/icons/logo_text.svg";
import logoSolo from "../../../../assets/icons/logo_solo.svg";

function Logo({ className, type = 'cloudy'}) {
  const logoMap = {
    cloudy: logoCloudy,
    both: logoBoth,
    text: logoText,
    solo: logoSolo,
  };

  const logoLink = logoMap[type] || logoCloudy;

  return <img className={`${className} min-w-10`} alt="Logo" src={logoLink} />;
}

export default Logo;
