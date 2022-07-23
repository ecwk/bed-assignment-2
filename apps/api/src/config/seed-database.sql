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
    "Changi is one of the world's most technologically-advanced airports. It is Asia’s first purpose-built airport, and was voted by Skytrax as the World's Best Airport in 2016"
  ),
  (
    'Kuala Lumpur International Airport',
    'Malaysia',
    'Kuala Lumpur',
    'Kuala Lumpur International Airport (KLIA) is the seventh busiest airport in the world and second busiest in Asia. It handles approximately 70 international airlines & hundreds of domestic flights each day'
  ),
  (
    'Taoyuan International Airport',
    'Taiwan',
    'Taipei',
    'Taiwan Taoyuan International Airport is the main international airport of Taiwan. It is used by over 30 million passengers to travel'
  ),
  (
    'Osaka International Airport',
    'Japan',
    'Osaka',
    'Osaka International Airport (ITM) is an airport serving Osaka and Kansai region in Japan. The airport is also known as Itami Airport, and handles flights both domestically and internationally'
  ),
  (
    'Beijing Capital International Airport',
    'China',
    'Beijing',
    "The Beijing Capital International Airport is the primary international airport serving Beijing, capital of the People' s Republic of China"
  );
INSERT INTO flight (
    `flight_code`,
    `aircraft_name`,
    `origin_airport_id`,
    `destination_airport_id`,
    `embark_date`,
    `travel_time`,
    `price`
  )
VALUES (
    'SP9120',
    'Boeing 777',
    1,
    5,
    '2022/08/24 10:45',
    '6 hours 20 mins',
    750.00
  ),
  (
    'SP0950',
    'Boeing 737',
    1,
    4,
    '2022/08/19 11:45',
    '10 hours 20 mins',
    1200.00
  ),
  (
    'SP6541',
    'Boeing 727',
    1,
    3,
    '2022/08/18 12:00',
    '6 hours 20 mins',
    600.00
  ),
  (
    'SP7345',
    'Boeing 727',
    1,
    3,
    '2022/08/30 8:45',
    '6 hours 20 mins',
    600.00
  ),
  (
    'SP6334',
    'Boeing 747',
    2,
    4,
    '2022/08/29 08:30',
    '8 hours 50 mins',
    900.00
  ),
  (
    'SP297',
    'Boeing 747',
    3,
    2,
    '2022/08/30 12:00 ',
    '4 hours 10 mins ',
    380.00
  ),
  (
    'SP3420',
    'Boeing 727',
    4,
    1,
    '2022/08/24 08:30',
    '12 hours 50 mins',
    1440.00
  ),
  (
    'SP1843',
    'Boeing 747',
    5,
    2,
    '2022/08/19 12:00 ',
    '6 hours 50 mins ',
    540.00
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