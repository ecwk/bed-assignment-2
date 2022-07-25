USE sp_air

INSERT INTO users (
    `username`,
    `email`,
    `contact`,
    `password`,
    `role`,
    `profile_pic_url`
  )
VALUES (
    'Winston Clint',
    'winstonclint51@mail.com',
    '+65 98130912',
    '$argon2i$v=19$m=4096,t=3,p=1$++QY6O6Za7eQW7QRspdfng$OkxlTbsLR4BvMCUYWj+WSOLsEHy4sI7hx83nOFSjnuE',
    'user',
    null
  ),
  (
    'Tan Wei Ming',
    'tanweiming26@mail.com',
    '+86 139-1099-8888',
    '$argon2i$v=19$m=4096,t=3,p=1$8Kth7Gm1une2xqSCSP/0BA$YVFWvZtdOcwipYMdfJlztGDPM6DsXXqlSGqS4UsITM8',
    'user',
    null
  ),
  (
    'Lily Collins',
    'lilycollins19@mail.com',
    '+65 83455041',
    '$argon2i$v=19$m=4096,t=3,p=1$eYlrfJGwavG5SOMEKNljhg$w30zpVsb3E2Q+TI/ds+tRx6inQ9nkYdjBx3fJdApvBQ',
    'admin',
    null
  ),
  (
    'Timothy Tan',
    'timothyganter04@mail.com',
    '+61 (02) 123-4567',
    '$argon2i$v=19$m=4096,t=3,p=1$yaW2TcEv1ttwlonBOZOTrQ$dAfskXLOMSPDUi9ECvoSXnU+RXX4zTmJyUjrT0uq+mU',
    'admin',
    null
  ),
  (
    'Joecey Garcia',
    'joceygarcia76@mail.com',
    '+33 678-908-878',
    '$argon2i$v=19$m=4096,t=3,p=1$yaW2TcEv1ttwlonBOZOTrQ$dAfskXLOMSPDUi9ECvoSXnU+RXX4zTmJyUjrT0uq+mU',
    'user',
    null
  ),
  (
    'Wade Clint',
    'wadeclint51@mail.com',
    '+65 98009252',
    '$argon2i$v=19$m=4096,t=3,p=1$yaW2TcEv1ttwlonBOZOTrQ$dAfskXLOMSPDUi9ECvoSXnU+RXX4zTmJyUjrT0uq+mU',
    'admin',
    null
  );
INSERT INTO airport (`name`, `country`, `city`, `description`)
VALUES (
    'Changi Airport',
    'Singapore',
    'Singapore',
    "Changi is one of the world's most technologically-advanced airports. It is Asia’s first purpose-built airport, and was voted by Skytrax as the World's Best Airport in 2016."
  ),
  (
    'Kuala Lumpur International Airport',
    'Malaysia',
    'Kuala Lumpur',
    'Kuala Lumpur International Airport (KLIA) is the seventh busiest airport in the world and second busiest in Asia. It handles approximately 70 international airlines & hundreds of domestic flights each day.'
  ),
  (
    'Taoyuan International Airport',
    'Taiwan',
    'Taipei',
    'Taiwan Taoyuan International Airport is the main international airport of Taiwan. It is used by over 30 million passengers to travel.'
  ),
  (
    'Osaka International Airport',
    'Japan',
    'Osaka',
    'Osaka International Airport (ITM) is an airport serving Osaka and Kansai region in Japan. The airport is also known as Itami Airport, and handles flights both domestically and internationally.'
  ),
  (
    'Beijing Capital International Airport',
    'China',
    'Beijing',
    "The Beijing Capital International Airport is the primary international airport serving Beijing, capital of the People's Republic of China."
  ),
  (
    'John F. Kennedy International Airport',
    'United States',
    'New York',
    "John F. Kennedy International Airport is the main international airport serving New York City. The airport is the busiest of the six airports in the New York airport system, the 13th-busiest airport in the United States, and the busiest international air passenger gateway into North America."
  ),
  (
    'Frankfurt International Airport',
    'Germany',
    'Frankfurt',
    'Frankfurt International Airport (FRA) is the main international airport in Germany. It is the busiest airport in Germany, and the second busiest in Europe.'
  ),
  (
    'London Heathrow Airport',
    'United Kingdom',
    'London',
    'London Heathrow Airport (LHR) is the main international airport in the United Kingdom. It is the busiest airport in the United Kingdom, and the second busiest in Europe.'
  ),
  (
    'Hong Kong International Airport',
    'Hong Kong',
    'Hong Kong',
    'Hong Kong International Airport (HKG) is the main international airport in Hong Kong. It is the busiest airport in Hong Kong, and the second busiest in Asia.'
  ),
  (
    'Shanghai International Airport',
    'China',
    'Shanghai',
    'Shanghai International Airport (SHA) is the main international airport in China. It is the busiest airport in China, and the second busiest in Asia.'
  ),
  (
    "Shenzhen Bao'an International Airport",
    'China',
    'Shenzhen',
    "Shenzhen Bao'an International Airport is the airport serving Shenzhen, Guangdong Province. It is located on the east bank of the Pearl River near Huangtian and Fuyong villages in Bao'an District, and is 32 km northwest of the city centre."
  ),
  (
    'Tokyo International Airport',
    'Japan',
    'Tokyo',
    "Tokyo International Airport, commonly known as Haneda Airport, Tokyo Haneda Airport, and Haneda International Airport, is one of two international airports serving the Greater Tokyo Area, the other one being Narita International Airport."
  ),
  (
    'Toronto Pearson International Airport',
    'Canada',
    'Toronto',
    "Toronto Pearson International Airport is the main airport serving Toronto, its metropolitan area, and the surrounding region known as the Golden Horseshoe."
  );
INSERT INTO flight (
    `flight_code`,
    `aircraft_name`,
    `origin_airport_id`,
    `destination_airport_id`,
    `departure_date`,
    `travel_time`,
    `price`
  )
VALUES (
    'SP9120',
    'Boeing 777',
    1,
    2,
    '2022-08-24 10:45:00',
    '2 hours 20 mins',
    350.00
  ),
  (
    'SP9121',
    'Boeing 737',
    1,
    2,
    '2022-08-26 20:10:00',
    '2 hours 45 mins',
    350.00
  ),
  (
    'SP9127',
    'Boeing 737',
    1,
    2,
    '2022-08-28 09:30:00',
    '2 hours 30 mins',
    350.00
  ),
  (
    'SP9131',
    'Boeing 777',
    1,
    2,
    '2022-08-30 05:45:00',
    '2 hours 0 mins',
    450.00
  ),
  (
    'SP9132',
    'Boeing 777',
    2,
    1,
    '2022-09-05 22:30:00',
    '2 hours 30 mins',
    375.00
  ),
  (
    'SP9122',
    'Boeing 777',
    1,
    5,
    '2022-08-24 21:45:00',
    '6 hours 20 mins',
    900.00
  ),
  (
    'SP0950',
    'Boeing 737',
    1,
    4,
    '2022-08-19 11:45:00',
    '10 hours 20 mins',
    1200.00
  ),
  (
    'SP6541',
    'Boeing 727',
    1,
    3,
    '2022-08-18 12:00:00',
    '6 hours 20 mins',
    600.00
  ),
  (
    'SP7345',
    'Boeing 727',
    1,
    12,
    '2022-08-30 08:45:00',
    '15 hours 20 mins',
    1200.00
  ),
  (
    'SP6334',
    'Boeing 747',
    2,
    4,
    '2022-08-29 08:30:00',
    '8 hours 50 mins',
    900.00
  ),
  (
    'SP297',
    'Boeing 747',
    3,
    2,
    '2022-08-30 12:00:00',
    '4 hours 10 mins ',
    380.00
  ),
  (
    'SP3420',
    'Boeing 727',
    4,
    1,
    '2022-08-24 08:30:00',
    '12 hours 50 mins',
    1440.00
  ),
  (
    'SP1843',
    'Boeing 747',
    5,
    2,
    '2022-08-19 12:00:00',
    '6 hours 50 mins ',
    540.00
  ),
  (
    'SP4901',
    'Boeing 777',
    11,
    1,
    '2022-08-24 08:30:00',
    '12 hours 50 mins',
    1440.00
  ),
  (
    'SP4902',
    'Boeing 777',
    8,
    5,
    '2022-08-24 19:30:00',
    '9 hours 0 mins',
    900.00
  );
INSERT INTO booking (
    `name`,
    `passport`,
    `nationality`,
    `age`,
    `user_id`,
    `flight_id`
  )
VALUES (
    'Winston Clint',
    'S1234555Z',
    'Singaporean',
    20,
    1,
    1
  ),
  (
    'Tan Wei Ming',
    'P81478148912O',
    'Chinese',
    23,
    2,
    2
  ),
  (
    'Lily Collins',
    'A941923012N',
    'Australian',
    27,
    3,
    3
  ),
  (
    'Timothy Tan',
    'M1234555Z',
    'Malaysian',
    61,
    4,
    4
  ),
  (
    'Jocey Garcia',
    'P912938021Y',
    'French',
    20,
    5,
    5
  );