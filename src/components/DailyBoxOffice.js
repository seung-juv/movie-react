import React, { useEffect, useState } from "react";
import moment from "moment";
import getDailyBoxOfficeList from "../components/getDailyBoxOfficeList";
import MoviePoster from "../components/MoviePoster";
import MovieContainer from "../components/MovieContainer";

const date = new Date();
const nowDate = moment(date);

const DailyBoxOffice = () => {
  const [isLoading, setIsloading] = useState(true);
  const [dailyBoxOfficeList, setDailyBoxOfficeList] = useState([]);

  const getData = async () => {
    try {
      setIsloading(true);
      const data = await getDailyBoxOfficeList({ targetDate: nowDate });
      setDailyBoxOfficeList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    !isLoading &&
    <MovieContainer
      title={dailyBoxOfficeList.boxofficeType}
      component={dailyBoxOfficeList.dailyBoxOfficeList.map((movie, idx) =>
        <MoviePoster key={idx} isLoading={isLoading} {...movie} />
      )}
    />
  );
};

export default DailyBoxOffice;
