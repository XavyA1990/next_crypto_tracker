import FacebookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
  MinusIcon,
  ChartBarSquareIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  HeartIcon as HeartIconSolid,
  ChartBarSquareIcon as ChartBarSquareIconSolid,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";

const Icons = ({ type, className }) => {
  const iconMap = {
    facebook: <FacebookIcon />,
    google: <GoogleIcon />,
    arrowTrendingDown: <ArrowTrendingDownIcon className={className} />,
    arrowTrendingUp: <ArrowTrendingUpIcon className={className} />,
    barsArrowDown: <BarsArrowDownIcon className={className} />,
    barsArrowUp: <BarsArrowUpIcon className={className} />,
    minus: <MinusIcon className={className} />,
    heart: <HeartIcon className={className} />,
    heartSolid: <HeartIconSolid className={className} />,
    chartBarSquare: <ChartBarSquareIcon className={className} />,
    chartBarSquareSolid: <ChartBarSquareIconSolid className={className} />,
    moon: <MoonIcon className={className} />,
    sun: <SunIcon className={className} />,
    bars3: <Bars3Icon className={className} />,
    xMark: <XMarkIcon className={className} />,
    chevronLeft: <ChevronLeftIcon className={className} />,
    chevronRight: <ChevronRightIcon className={className} />,
    exclamationTriangle: <ExclamationTriangleIcon className={className} />,
    sparkles: <SparklesIcon className={className} />,
  };
  const IconComponent = iconMap[type];

  return IconComponent;
};

export default Icons;
