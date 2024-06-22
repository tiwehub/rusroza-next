import React, { useState, useEffect } from 'react';

interface StockImage {
  node: {
    link: string;
  };
}

interface StockLink {
  url: string;
}

interface Stock {
  stock_period: string;
  stock_promotitle: string;
  stock_promodesc: string;
  stockImage: StockImage;
  stock_link: StockLink;
  stock_settime: string;
  stock_endtime: string;
}

interface Post {
  id: string;
  title: string;
  date: string;
  stock: Stock;
}

interface StockCardProps {
  post: Post;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (startTime: Date, endTime: Date): TimeLeft => {
  const now = new Date().getTime();
  const difference = endTime.getTime() - now;

  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const StockCard: React.FC<StockCardProps> = ({ post }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startTime = new Date(post.stock.stock_settime);
  const endTime = new Date(post.stock.stock_endtime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startTime, endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  return (
    <div className="border-2 border-main-light-violet rounded-2xl p-4 flex gap-6 flex-col md:flex-row relative mt-10 mb-10">
      <div className="w-full sm:w-2/4 lg:w-1/4 mx-auto sm:mt-0">
        <img
          src={post.stock.stockImage.node.link}
          width="280"
          height="280"
          alt={post.title}
          className="object-cover rounded-3xl w-full h-[280px] md:h-[331px] lg:h-[280px] mt-28 sm:mt-0"
        />
      </div>
      <div className="flex flex-col lg:w-3/4 md:w-2/4 items-center">
        <div className="md:w-full absolute sm:relative top-4 sm:top-0">
          <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center">
            <p className="font-medium text-sm text-gray-400 mb-2 lg:mb-0">
              {post.stock.stock_period}
            </p>
            <div className="lg:ms-auto flex lg:flex-row flex-col justify-center items-center md:items-start lg:items-center">
              <p className="text-[10px] font-bold text-main-dark-violet uppercase lg:me-3 mb-2 lg:mb-0">
                До конца сезона осталось:
              </p>
              <div className="flex items-center gap-2 lg:justify-center bg-main-dark-violet rounded-full px-5 py-0.5">
                <div>
                  <p className="font-bold text-white text-center">
                    {timeLeft.days}
                  </p>
                  <p className="text-xs text-white">Дней</p>
                </div>
                <span className="text-white font-medium">:</span>
                <div>
                  <p className="font-bold text-white text-center">
                    {timeLeft.hours}
                  </p>
                  <p className="text-xs text-white">Часов</p>
                </div>
                <span className="text-white font-medium">:</span>
                <div>
                  <p className="font-bold text-white text-center">
                    {timeLeft.minutes}
                  </p>
                  <p className="text-xs text-white">Минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-xl font-bold text-main-text uppercase mb-5">
            {post.stock.stock_promotitle}
          </h1>
          <p className="font-medium">{post.stock.stock_promodesc}</p>
          <div className="mt-3 flex lg:flex-row flex-col lg:items-center">
            <p className="text-xs font-medium text-gray-400 lg:w-3/5 mb-5 lg:mb-0">
              Акция действует, пока товар есть в наличии, скидки по картам на
              аукционные саженцы не распространяются, акции не суммируются.
            </p>
            <a
              href={post.stock.stock_link.url}
              className="bg-main-orange hover:bg-orange-300 transition-all duration-300 text-white font-bold py-3 sm:px-12 rounded-full uppercase text-xs md:ms-auto mx-auto sm:mx-0 w-full flex justify-center sm:w-fit sm:justify-center sm:flex"
            >
              Смотреть товары
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
