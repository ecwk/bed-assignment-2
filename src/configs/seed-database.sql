INSERT INTO users (
    `username`,
    `email`,
    `contact`,
    `password`,
    `role`,
    `profile_pic_url`
  )
VALUES (
    'Customer1',
    'customer1@mail.com',
    '00000001',
    '$argon2i$v=19$m=4096,t=3,p=1$++QY6O6Za7eQW7QRspdfng$OkxlTbsLR4BvMCUYWj+WSOLsEHy4sI7hx83nOFSjnuE',
    'Customer',
    'https://i.pravatar.cc/320'
  ),
  (
    'Customer2',
    'customer2@mail.com',
    '00000002',
    '$argon2i$v=19$m=4096,t=3,p=1$8Kth7Gm1une2xqSCSP/0BA$YVFWvZtdOcwipYMdfJlztGDPM6DsXXqlSGqS4UsITM8',
    'Customer',
    ''
  ),
  (
    'Admin1',
    'admin1@mail.com',
    '00000003',
    '$argon2i$v=19$m=4096,t=3,p=1$eYlrfJGwavG5SOMEKNljhg$w30zpVsb3E2Q+TI/ds+tRx6inQ9nkYdjBx3fJdApvBQ',
    'Admin',
    ''
  ),
  (
    'Admin2',
    'admin2@mail.com',
    '00000004',
    '$argon2i$v=19$m=4096,t=3,p=1$yaW2TcEv1ttwlonBOZOTrQ$dAfskXLOMSPDUi9ECvoSXnU+RXX4zTmJyUjrT0uq+mU',
    'Admin',
    'https://i.pravatar.cc/320'
  );
INSERT INTO airport (`name`, `country`, `description`)
VALUES ('Airport1', 'Country1', 'Description1'),
  (
    'Airport2',
    'Country2',
    'Description2'
  ),
  (
    'Airport3',
    'Country3',
    'Description3'
  ),
  (
    'Airport4',
    'Country4',
    'Description4'
  ),
  (
    'Airport5',
    'Country5',
    'Description5'
  );
INSERT INTO flight (
    `flightCode`,
    `aircraft`,
    `originAirport`,
    `destinationAirport`,
    `embarkDate`,
    `travelTime`,
    `price`
  )
VALUES (
    'SP001',
    'Aircraft1',
    1,
    2,
    '2022/08/01 08:20',
    '1 hours 50 mins',
    100.00
  ),
  (
    'SP002',
    'Aircraft2',
    2,
    3,
    '2022/08/01 08:20',
    '1 hours 50 mins',
    200.00
  ),
  (
    'SP003',
    'Aircraft3',
    3,
    4,
    '2022/08/01 08:20',
    '1 hours 50 mins',
    300.00
  ),
  (
    'SP004',
    'Aircraft4',
    4,
    5,
    '2022/08/01 08:20',
    '1 hours 50 mins',
    400.00
  ),
  (
    'SP005',
    'Aircraft5',
    5,
    1,
    '2022/08/01 08:20',
    '1 hours 50 mins',
    500.00
  );
INSERT INTO booking (
    `name`,
    `passport`,
    `nationality`,
    `age`,
    `userid`,
    `flightid`
  )
VALUES (
    'John Smith',
    'S1234555Z',
    'Singaporean',
    20,
    1,
    1
  ),
  (
    'John Cold',
    'C1234555Z',
    'China',
    23,
    2,
    3
  ),
  (
    'John Brown',
    'A1234555Z',
    'American',
    27,
    3,
    5
  ),
  (
    'John Wick',
    'M1234555Z',
    'Malaysian',
    61,
    4,
    1
  );