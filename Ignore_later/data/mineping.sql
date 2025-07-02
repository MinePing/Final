
USE mineping;
DESCRIBE health;
-- amenity 테이블의 엔티티명 (amenity_no, amenity_name, worcation_amenities)
INSERT INTO amenity (amenity_no, amenity_name) VALUES (1,"Wi-Fi");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (2,"회의실");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (3,"주차장");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (4,"카페");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (5,"전자레인지");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (6,"프린터");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (7,"샤워실");
INSERT INTO amenity (amenity_no, amenity_name) VALUES (8,"휴게 공간");

-- company 테이블 INSERT 문 (모든 필드 포함)
INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (1, '헬로우컴퍼니', '1112233333', '김철수', '2020-03-15', '서울특별시 강남구 테헤란로 123', 'hello@hellocompany.co.kr', '02-1234-5678', 'Y', '2020-03-15 09:00:00', '2024-12-01 10:30:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (2, '휴식과일', '2223344444', '이영희', '2019-07-20', '서울특별시 서초구 서초대로 456', 'rest@restfruit.co.kr', '02-2345-6789', 'Y', '2019-07-20 14:15:00', '2024-11-25 16:45:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (3, '워케이션컴퍼니', '3334455555', '박민수', '2021-01-10', '부산광역시 해운대구 해운대로 789', 'work@worcation.co.kr', '051-3456-7890', 'Y', '2021-01-10 11:20:00', '2024-12-05 08:15:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (4, '비즈니스하우스', '4445566666', '정대호', '2018-11-05', '대구광역시 수성구 동대구로 321', 'biz@bizhouse.co.kr', '053-4567-8901', 'Y', '2018-11-05 13:40:00', '2024-11-30 12:20:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (5, '커넥트플레이스', '5556677777', '최은정', '2022-05-25', '인천광역시 연수구 컨벤시아대로 654', 'connect@connectplace.co.kr', '032-5678-9012', 'Y', '2022-05-25 15:30:00', '2024-12-03 09:45:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (6, '자연속쉼터', '6667788888', '강태우', '2020-09-12', '강원도 춘천시 중앙로 987', 'nature@natureshelter.co.kr', '033-6789-0123', 'Y', '2020-09-12 10:15:00', '2024-11-28 14:30:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (7, '힐링오피스', '7778899999', '윤서연', '2023-02-18', '제주특별자치도 제주시 첨단로 147', 'healing@healingoffice.co.kr', '064-7890-1234', 'Y', '2023-02-18 08:45:00', '2024-12-07 11:10:00');

INSERT INTO company (company_no, company_name, business_id, licensee, open_date, company_address, business_email, company_tel, status, create_at, update_at) 
VALUES (8, '모던워크', '8889900000', '홍길동', '2021-08-30', '광주광역시 서구 상무대로 258', 'modern@modernwork.co.kr', '062-8901-2345', 'Y', '2021-08-30 16:25:00', '2024-12-02 13:55:00');

-- department 테이블의 엔티티명 (department_no, department_name)
INSERT INTO department (department_no, department_name, company_no) VALUES (1,"인사팀",1);
INSERT INTO department (department_no, department_name, company_no) VALUES (2,"개발팀",1);
INSERT INTO department (department_no, department_name, company_no) VALUES (3,"마케팅팀",2);
INSERT INTO department (department_no, department_name, company_no) VALUES (4,"디자인팀",2);
INSERT INTO department (department_no, department_name, company_no) VALUES (5,"영업팀",1);
INSERT INTO department (department_no, department_name, company_no) VALUES (6,"기획팀",3);
INSERT INTO department (department_no, department_name, company_no) VALUES (7,"재무팀",3);
INSERT INTO department (department_no, department_name, company_no) VALUES (8,"고객지원팀",1);

-- member 테이블 INSERT 문 (모든 필드 포함)
INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (1, 'qwe123', '$2a$10$encrypted_password_hash1', '김철수', 'kim.cs@hellocompany.co.kr', 'M', '1985-03-15', '서울특별시 강남구 역삼동 123-45', '010-1234-5678', 'MASTER', '2020-03-15 09:30:00', '2024-12-15 14:20:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (2, 'qw12', '$2a$10$encrypted_password_hash2', '이영희', 'lee.yh@restfruit.co.kr', 'W', '1990-07-22', '서울특별시 서초구 잠원동 456-78', '010-2345-6789', 'MANAGER', '2019-07-20 10:15:00', '2024-12-14 16:30:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (3, 'qweqwe', '$2a$10$encrypted_password_hash3', '박민수', 'park.ms@worcation.co.kr', 'M', '1988-01-10', '부산광역시 해운대구 우동 789-12', '010-3456-7890', 'EMPLOYEE', '2021-01-10 11:45:00', '2024-12-13 09:15:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (4, 'qwe1234', '$2a$10$encrypted_password_hash4', '정대호', 'jung.dh@bizhouse.co.kr', 'M', '1982-11-05', '대구광역시 수성구 범어동 321-54', '010-4567-8901', 'MASTER', '2018-11-05 13:20:00', '2024-12-12 11:40:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (5, 'qwer1234', '$2a$10$encrypted_password_hash5', '최은정', 'choi.ej@connectplace.co.kr', 'W', '1992-05-25', '인천광역시 연수구 송도동 654-87', '010-5678-9012', 'MANAGER', '2022-05-25 15:10:00', '2024-12-11 12:25:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (6, 'eee333', '$2a$10$encrypted_password_hash6', '강태우', 'kang.tw@natureshelter.co.kr', 'M', '1987-09-12', '강원도 춘천시 효자동 987-21', '010-6789-0123', 'EMPLOYEE', '2020-09-12 10:30:00', '2024-12-10 14:55:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (7, 'qqq111', '$2a$10$encrypted_password_hash7', '윤서연', 'yoon.sy@healingoffice.co.kr', 'W', '1995-02-18', '제주특별자치도 제주시 연동 147-63', '010-7890-1234', 'WORCATION', '2023-02-18 08:45:00', '2024-12-09 16:05:00', 'Y');

INSERT INTO member (user_no, user_id, user_pwd, name, email, gender, birthday, address, phone, role, create_at, update_at, status)
VALUES (8, 'www222', '$2a$10$encrypted_password_hash8', '홍길동', 'hong.gd@modernwork.co.kr', 'M', '1991-08-30', '광주광역시 서구 치평동 258-96', '010-8901-2345', 'EMPLOYEE', '2021-08-30 16:00:00', '2024-12-08 13:10:00', 'Y');

-- health 테이블 INSERT 문 (모든 필드 포함)
INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (1, 1, 70.5, 175.0, 23.0,'None', '120/80', 95.0, 'Healthy', 180, 'Non-Smoker', 'High', 7.5, 'Balanced', '2024-12-15');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (2, 2, 85.2, 168.0, 30.2,'High', '140/90', 110.0, 'Obesity', 220, 'Smoker', 'Low', 6.0, 'High Card', '2024-12-14');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (3, 3, 58.0, 162.0, 22.1, 'None', '110/70', 88.0, 'Healthy', 160, 'Non-Smoker', 'Moderate', 8.0, 'Vegan', '2024-12-13');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (4, 4, 78.0, 180.0, 24.1,'Moderate',  '130/85', 125.0, 'Diabetes', 200, 'Non-Smoker', 'Moderate', 7.0, 'High Protein', '2024-12-12');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (5, 5, 92.5, 172.0, 31.3, 'High', '150/95', 105.0, 'Hypertension', 240, 'Smoker', 'Low', 5.5, 'High Card', '2024-12-11');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (6, 6, 65.0, 170.0, 22.5,'None',  '125/82', 92.0, 'Healthy', 175, 'Non-Smoker', 'High', 8.5, 'Balanced', '2024-12-10');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (7, 7, 75.8, 165.0, 27.8,'Moderate',  '135/88', 98.0, 'Cardiac Issues', 210, 'Non-Smoker', 'Moderate', 6.5, 'High Protein', '2024-12-09');

INSERT INTO health (health_no, user_no, weight, height, bmi, alcohol_consumption, blood_pressure, blood_sugar, health_condition, cholesterol_level, smoking_status, physical_activity, sleep_hours, diet_type, update_date)
VALUES (8, 8, 68.5, 178.0, 21.6,'None', '115/75', 85.0, 'Healthy', 155, 'Non-Smoker', 'High', 9.0, 'Vegan', '2024-12-08');

-- company_profile 테이블의 엔티티명 (profile_no, user_no, company_no, department, position, company_phone, company_email, approve)
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (1,1,1,"기획팀","팀장","010-1111-1111","planner1@company.com","Y");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (2,2,1,"기획팀","사원","010-1111-2222","planner2@company.com","W");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (3,3,2,"마케팅팀","매니저","010-2222-1111","marketer1@company.com","Y");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (4,4,2,"마케팅팀","사원","010-2222-2222","marketer2@company.com","W");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (5,5,3,"개발팀","팀장","010-3333-1111","devlead@company.com","Y");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (6,6,3,"개발팀","주임","010-3333-2222","devjunior@company.com","W");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (7,7,4,"인사팀","사원","010-4444-1111","hrstaff@company.com","Y");
INSERT INTO company_profile (profile_no, user_no, company_no, department_name, position, company_phone, company_email, approve) VALUES (8,8,4,"인사팀","사원","010-4444-2222","hrstaff2@company.com","W");

-- sido_areas
INSERT INTO sido_areas (name) VALUES
('서울특별시'),
('부산광역시'),
('대구광역시'),
('인천광역시'),
('광주광역시'),
('대전광역시'),
('울산광역시'),
('세종특별자치시'),
('경기도'),
('강원도'),
('충청북도'),
('충청남도'),
('전라북도'),
('전라남도'),
('경상북도'),
('경상남도'),
('제주특별자치도');

-- 서울특별시 (sido_area_id = 1)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('종로구', 1),
('중구', 1),
('용산구', 1),
('성동구', 1),
('광진구', 1),
('동대문구', 1),
('중랑구', 1),
('성북구', 1),
('강북구', 1),
('도봉구', 1),
('노원구', 1),
('은평구', 1),
('서대문구', 1),
('마포구', 1),
('양천구', 1),
('강서구', 1),
('구로구', 1),
('금천구', 1),
('영등포구', 1),
('동작구', 1),
('관악구', 1),
('서초구', 1),
('강남구', 1),
('송파구', 1),
('강동구', 1);

-- 부산광역시 (sido_area_id = 2)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('중구', 2),
('서구', 2),
('동구', 2),
('영도구', 2),
('부산진구', 2),
('동래구', 2),
('남구', 2),
('북구', 2),
('해운대구', 2),
('사하구', 2),
('금정구', 2),
('강서구', 2),
('연제구', 2),
('수영구', 2),
('사상구', 2),
('기장군', 2);

-- 대구광역시 (sido_area_id = 3)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('중구', 3),
('동구', 3),
('서구', 3),
('남구', 3),
('북구', 3),
('수성구', 3),
('달서구', 3),
('달성군', 3),
('군위군', 3);

-- 인천광역시 (sido_area_id = 4)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('중구', 4),
('동구', 4),
('미추홀구', 4),
('연수구', 4),
('남동구', 4),
('부평구', 4),
('계양구', 4),
('서구', 4),
('강화군', 4),
('옹진군', 4);

-- 광주광역시 (sido_area_id = 5)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('동구', 5),
('서구', 5),
('남구', 5),
('북구', 5),
('광산구', 5);

-- 대전광역시 (sido_area_id = 6)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('동구', 6),
('중구', 6),
('서구', 6),
('유성구', 6),
('대덕구', 6);

-- 울산광역시 (sido_area_id = 7)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('중구', 7),
('남구', 7),
('동구', 7),
('북구', 7),
('울주군', 7);

-- 세종특별자치시 (sido_area_id = 8)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('세종특별자치시', 8);

-- 경기도 (sido_area_id = 9)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('수원시', 9),
('성남시', 9),
('의정부시', 9),
('안양시', 9),
('부천시', 9),
('광명시', 9),
('평택시', 9),
('동두천시', 9),
('안산시', 9),
('고양시', 9),
('과천시', 9),
('구리시', 9),
('남양주시', 9),
('오산시', 9),
('시흥시', 9),
('군포시', 9),
('의왕시', 9),
('하남시', 9),
('용인시', 9),
('파주시', 9),
('이천시', 9),
('안성시', 9),
('김포시', 9),
('화성시', 9),
('광주시', 9),
('양주시', 9),
('포천시', 9),
('여주시', 9),
('연천군', 9),
('가평군', 9),
('양평군', 9);

-- 강원특별자치도 (sido_area_id = 10)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('춘천시', 10),
('원주시', 10),
('강릉시', 10),
('동해시', 10),
('태백시', 10),
('속초시', 10),
('삼척시', 10),
('홍천군', 10),
('횡성군', 10),
('영월군', 10),
('평창군', 10),
('정선군', 10),
('철원군', 10),
('화천군', 10),
('양구군', 10),
('인제군', 10),
('고성군', 10),
('양양군', 10);

-- 충청북도 (sido_area_id = 11)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('청주시', 11),
('충주시', 11),
('제천시', 11),
('보은군', 11),
('옥천군', 11),
('영동군', 11),
('증평군', 11),
('진천군', 11),
('괴산군', 11),
('음성군', 11),
('단양군', 11);

-- 충청남도 (sido_area_id = 12)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('천안시', 12),
('공주시', 12),
('당진시', 12),
('보령시', 12),
('아산시', 12),
('서산시', 12),
('논산시', 12),
('계룡시', 12),
('금산군', 12),
('부여군', 12),
('서천군', 12),
('청양군', 12),
('홍성군', 12),
('예산군', 12),
('태안군', 12);

-- 전북특별자치도 (sido_area_id = 13)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('전주시', 13),
('군산시', 13),
('익산시', 13),
('정읍시', 13),
('남원시', 13),
('김제시', 13),
('완주군', 13),
('진안군', 13),
('무주군', 13),
('장수군', 13),
('임실군', 13),
('순창군', 13),
('고창군', 13),
('부안군', 13);

-- 전라남도 (sido_area_id = 14)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('목포시', 14),
('여수시', 14),
('순천시', 14),
('나주시', 14),
('광양시', 14),
('담양군', 14),
('곡성군', 14),
('구례군', 14),
('고흥군', 14),
('보성군', 14),
('화순군', 14),
('장흥군', 14),
('강진군', 14),
('해남군', 14),
('영암군', 14),
('무안군', 14),
('함평군', 14),
('영광군', 14),
('장성군', 14),
('완도군', 14),
('진도군', 14),
('신안군', 14);

-- 경상북도 (sido_area_id = 15)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('포항시', 15),
('경주시', 15),
('김천시', 15),
('안동시', 15),
('구미시', 15),
('영주시', 15),
('영천시', 15),
('상주시', 15),
('문경시', 15),
('경산시', 15),
('의성군', 15),
('청송군', 15),
('영양군', 15),
('영덕군', 15),
('청도군', 15),
('고령군', 15),
('성주군', 15),
('칠곡군', 15),
('예천군', 15),
('봉화군', 15),
('울진군', 15),
('울릉군', 15);

-- 경상남도 (sido_area_id = 16)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('창원시', 16),
('진주시', 16),
('통영시', 16),
('사천시', 16),
('김해시', 16),
('밀양시', 16),
('거제시', 16),
('양산시', 16),
('의령군', 16),
('함안군', 16),
('창녕군', 16),
('고성군', 16),
('남해군', 16),
('하동군', 16),
('산청군', 16),
('함양군', 16),
('거창군', 16),
('합천군', 16);

-- 제주특별자치도 (sido_area_id = 17)
INSERT INTO sigg_areas (name, sido_area_id) VALUES
('제주시', 17),
('서귀포시', 17);

-- worcation
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (1, 1, 1,"산속 오피스하우스","Office","https://picsum.photos/seed/office1/400/400","자연과 함께",20,"40,000원",60000,"강원도 평창군 산속길 123","2025-06-01T10:00:00","2025-06-01T10:00:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (2, 2, 2,"해변의 숙소","Accommodation","https://picsum.photos/seed/beach2/400/400","휴식의 바다",10,"60,000원",80000,"부산 해운대구 바닷가로 45","2025-06-02T11:00:00","2025-06-02T11:00:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (3, 3, 3,"도심 속 워케이션","OfficeAndStay","https://picsum.photos/seed/city3/400/400","업무 효율 극대화",50,"55,000원",70000,"서울특별시 강남구 테헤란로 101","2025-06-03T09:30:00","2025-06-03T09:30:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (4, 4, 4,"숲속 캠프오피스","Office","https://picsum.photos/seed/forest4/400/400","힐링과 집중",15,"30,000원",50000,"전라북도 완주군 삼례읍 산골로 87","2025-06-04T12:15:00","2025-06-04T12:15:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (5, 5, 5,"강가의 쉼터","Accommodation","https://picsum.photos/seed/river5/400/400","자연 속 여유",12,"45,000원",65000,"경기도 가평군 강변로 12","2025-06-05T08:00:00","2025-06-05T08:00:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (6, 6, 6,"한옥 워케이션","OfficeAndStay","https://picsum.photos/seed/hanok6/400/400","전통과 현대의 조화",8,"70,000원",90000,"경상북도 경주시 불국로 33","2025-06-06T10:30:00","2025-06-06T10:30:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (7, 7, 7,"도서관 옆 사무실","Office","https://picsum.photos/seed/library7/400/400","조용한 집중",25,"35,000원",55000,"대전광역시 유성구 대학로 99","2025-06-07T13:00:00","2025-06-07T13:00:00","Y");
INSERT INTO worcation (worcation_no, ref_writer, ref_area_id, worcation_name, worcation_category, main_change_photo, worcation_thema, max_people, partner_price, non_partner_price, worcation_address, create_at, update_at, status) values (8, 8, 8,"제주 스테이카페","OfficeAndStay","https://picsum.photos/seed/jeju8/400/400","휴식과 영감",18,"50,000원",75000,"제주특별자치도 제주시 바다로 88","2025-06-08T09:00:00","2025-06-08T09:00:00","Y");

-- worcation_features
INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (1, "mountain", "nature_earth", "eco_friendly", "rest", "reading,swimming,meditation", "nature_lodging");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (2, "sea", "blue_sky", "urban_nature", "scenery", "reading,meditation,social", "emotional_style");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (3, "city", "achromatic", "modern", "work_efficiency", "meditation,swimming,social", "clean_convenient");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (4, "river", "yellow_orange", "quiet", "overall_vibe", "reading,food_tour,meditation", "shared_space");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (5, "mountain", "purple", "camping", "activity", "등산, 바베큐, 천체관측", "camping_car");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (6, "plain", "nature_earth", "eco_friendly", "scenery", "social,reading,social", "emotional_style");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (7, "city", "achromatic", "modern", "work_efficiency", "swimming,food_tour,meditation", "clean_convenient");

INSERT INTO worcation_features (worcation_no, location_type, dominant_color, space_mood, best_for, activities, accommodation_type) 
VALUES (8, "sea", "blue_sky", "urban_nature", "rest", "social,swimming", "nature_lodging");

-- worcation_detail
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(1,"포포인츠 주식회사","1012345678","033-123-4567",30000,"산속에 위치한 조용한 오피스 공간으로 자연과 함께 업무에 집중할 수 있습니다.","평창IC에서 차량 15분 거리, 내비에 '산속 오피스하우스' 검색","09:00 ~ 18:00","이용 3일 전 전액 환불, 이후 50% 환불","2022-05-01");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(2,"블루씨 리조트","1023456789","051-234-5678",50000,"해운대 해변 근처의 감성 숙소, 파도 소리를 들으며 쉴 수 있는 공간","해운대역 3번 출구에서 도보 10분","14:00 ~ 익일 11:00","이용 5일 전 전액 환불, 2일 전 30% 환불","2023-01-15");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(3,"씨티워크 오피스텔","1034567890","02-987-6543",40000,"도심 속 세련된 공유 오피스 공간으로 업무 집중 최적화","강남역 2번 출구에서 도보 5분","08:00 ~ 22:00","당일 취소 시 환불 불가","2021-09-01");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(4,"숲속캠프","1045678901","063-456-7890",25000,"자연 속에서 캠핑과 워케이션을 동시에 즐길 수 있는 공간","완주 삼례IC에서 차량 10분","10:00 ~ 20:00","전일 취소 시 70% 환불","2022-07-20");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(5,"리버힐하우스","1056789012","031-789-0123",45000,"강가에 위치한 조용하고 여유로운 숙소, 휴식에 최적","가평역에서 픽업 서비스 제공","15:00 ~ 익일 11:00","3일 전까지 100%, 이후 환불 불가","2023-03-10");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(6,"경주한옥스테이","1067890123","054-456-7890",60000,"전통 한옥에서의 색다른 워케이션 경험 제공","불국사역 근처, 도보 7분","체크인 14:00 ~ 체크아웃 11:00","7일 전까지 100%, 이후 50%","2023-04-01");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(7,"도서관오피스","1078901234","042-333-4444",20000,"조용한 도서관 옆 사무실 공간으로 집중에 적합","대전 유성온천역에서 도보 3분","07:00 ~ 19:00","환불 불가","2021-12-12");
INSERT INTO worcation_detail (worcation_no,licensee,business_id,worcation_tel,charge_amount,content, navigate, available_time,refund_policy,open_date)values(8,"제주스테이카페","1089012345","064-999-8888",48000,"카페형 워케이션 공간으로 휴식과 영감을 동시에","제주공항에서 차량 20분 거리","10:00 ~ 22:00","이용 3일 전까지 전액 환불","2023-05-10");

-- mental 테이블 INSERT 문 (모든 필드 포함)
INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (1, 1, 15, 'Normal', '현재 정신건강 상태가 양호합니다. 업무와 개인생활의 균형을 잘 유지하고 있으며, 스트레스 관리도 효과적으로 하고 있습니다. 지속적인 건강한 생활 패턴을 유지하시기 바랍니다.', NULL, '2024-12-15');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (2, 2, 28, 'Concern', '약간의 스트레스 징후가 보입니다. 업무 부담이나 대인관계에서 오는 긴장감이 있을 수 있습니다. 충분한 휴식과 취미활동을 통해 스트레스를 해소하시고, 필요시 전문가 상담을 고려해보세요.', 'STRESS', '2024-12-14');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (3, 3, 12, 'Normal', '정신적으로 건강한 상태를 유지하고 있습니다. 긍정적인 사고와 활발한 사회활동이 도움이 되고 있습니다. 현재의 라이프스타일을 지속하며 정기적인 자기점검을 해보시기 바랍니다.', NULL, '2024-12-13');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (4, 4, 35, 'Mild', '경미한 수준의 심리적 부담을 경험하고 있습니다. 업무 과부하나 개인적 고민이 영향을 주고 있을 수 있습니다. 규칙적인 운동과 명상, 그리고 신뢰할 수 있는 사람과의 대화를 통해 개선해보세요.', 'STRESS', '2024-12-12');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (5, 5, 45, 'Severe', '상당한 수준의 번아웃 증상이 나타납니다. 업무에 대한 의욕 저하, 피로감, 무력감 등을 경험하고 있을 수 있습니다. 충분한 휴식과 업무 조정이 필요하며, 전문가의 도움을 받으시길 권합니다.', 'BURNOUT', '2024-12-11');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (6, 6, 18, 'Normal', '전반적으로 안정된 정신건강 상태입니다. 자연과의 접촉과 명상 등의 활동이 긍정적인 영향을 주고 있습니다. 현재의 건강한 습관들을 지속하시면서 자기관리에 계속 신경 써주세요.', NULL, '2024-12-10');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (7, 7, 32, 'Mild', '경미한 스트레스 상태가 관찰됩니다. 새로운 환경이나 업무 변화에 적응하는 과정에서 오는 긴장감일 수 있습니다. 점진적인 적응과 함께 스트레스 완화 방법을 실천해보시기 바랍니다.', 'STRESS', '2024-12-09');

INSERT INTO mental (mental_no, user_no, score, psychological_state, result_content, separation, update_date) 
VALUES (8, 8, 22, 'Concern', '가벼운 주의가 필요한 상태입니다. 독립적인 성향으로 인해 혼자서 문제를 해결하려 하다가 스트레스가 쌓일 수 있습니다. 적절한 사회적 지지와 도움을 받아들이는 것도 중요합니다.', 'STRESS', '2024-12-08');


-- photo 테이블의 엔티티명 (photo_no, worcation_no, change_name)
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (1,1,"https://picsum.photos/seed/photo1/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (2,1,"https://picsum.photos/seed/photo2/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (3,2,"https://picsum.photos/seed/photo3/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (4,2,"https://picsum.photos/seed/photo4/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (5,3,"https://picsum.photos/seed/photo5/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (6,4,"https://picsum.photos/seed/photo6/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (7,5,"https://picsum.photos/seed/photo7/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (8,6,"https://picsum.photos/seed/photo8/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (9,7,"https://picsum.photos/seed/photo9/800/600");
INSERT INTO photo (photo_no, worcation_no, change_name) VALUES (10,8,"https://picsum.photos/seed/photo10/800/600");

-- worcation_application 테이블의 엔티티명 (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at)
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (1,1,1,"W","2025-06-18","2025-06-19","2025-06-10T10:00:00","2025-06-12T14:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (2,2,2,"W","2025-07-03","2025-07-07","2025-06-11T09:00:00","2025-06-11T09:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (3,3,3,"Y","2025-07-10","2025-07-15","2025-06-13T08:30:00","2025-06-14T11:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (4,4,4,"Y","2025-07-20","2025-07-25","2025-06-15T10:00:00","2025-06-16T10:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (5,5,5,"Y","2025-07-05","2025-07-09","2025-06-17T14:00:00","2025-06-17T14:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (6,6,6,"Y","2025-07-08","2025-07-12","2025-06-18T09:30:00","2025-06-19T10:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (7,7,7,"W","2025-07-15","2025-07-19","2025-06-20T08:00:00","2025-06-21T08:00:00");
INSERT INTO worcation_application (application_no, user_no, worcation_no, approve, start_date, end_date, create_at, update_at) VALUES (8,8,8,"W","2025-07-18","2025-07-22","2025-06-22T10:00:00","2025-06-22T10:00:00");

-- Review 테이블에 20개의 샘플 데이터 삽입
INSERT INTO review (application_no, writer_id, review_content, create_at, update_at) VALUES
(1, 'user001', '워케이션 장소가 정말 훌륭했습니다. 업무 환경도 좋고 주변 환경도 아름다워서 집중도 잘 되고 휴식도 제대로 취할 수 있었어요. 다음에도 꼭 이용하고 싶습니다.', '2024-01-15 09:30:00', '2024-01-15 09:30:00'),

(2, 'user002', '시설이 깔끔하고 와이파이도 빨라서 업무하기에 최적이었습니다. 특히 카페 공간이 마음에 들었어요. 커피도 맛있고 분위기도 좋아서 창의적인 아이디어가 많이 떠올랐습니다.', '2024-01-18 14:20:00', '2024-01-18 14:20:00'),

(3, 'user003', '처음 워케이션을 경험해봤는데 정말 만족스러웠습니다. 일과 휴식의 완벽한 조화를 느꼈어요. 숙소도 깨끗하고 근처에 맛집도 많아서 좋았습니다.', '2024-01-22 11:45:00', '2024-01-22 11:45:00'),

(4, 'user004', '뷰가 정말 환상적이었습니다. 바다를 보면서 일하니 스트레스도 풀리고 업무 효율도 올라갔어요. 다만 에어컨이 조금 약해서 여름에는 더울 수 있을 것 같아요.', '2024-01-25 16:10:00', '2024-01-25 16:10:00'),

(5, 'user005', '동료들과 함께 팀 워케이션으로 다녀왔는데 팀워크 향상에 정말 도움이 되었습니다. 회의실도 잘 갖춰져 있고 팀 빌딩 액티비티도 할 수 있어서 좋았어요.', '2024-02-01 10:25:00', '2024-02-01 10:25:00'),

(6, 'user006', '조용하고 평화로운 환경에서 집중해서 일할 수 있어서 좋았습니다. 특히 도서관 같은 분위기의 업무 공간이 인상적이었어요. 책도 많이 비치되어 있어서 틈틈이 읽을 수 있었습니다.', '2024-02-05 13:40:00', '2024-02-05 13:40:00'),

(7, 'user007', '가성비가 정말 좋은 워케이션 장소였습니다. 가격 대비 시설도 훌륭하고 서비스도 친절했어요. 주변에 편의시설도 많아서 불편함이 없었습니다.', '2024-02-08 08:55:00', '2024-02-08 08:55:00'),

(8, 'user008', '자연 속에서 일하는 기분이 정말 새로웠습니다. 산속에 위치해 있어서 공기도 맑고 새소리도 들리면서 힐링이 되었어요. 업무 스트레스가 많이 해소되었습니다.', '2024-02-12 15:30:00', '2024-02-12 15:30:00');

-- worcation_amenity 테이블의 엔티티명 (worc_amenity_no, worcation_no, amenity_no)
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (1,1,1);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (2,1,2);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (3,1,3);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (4,1,1);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (5,2,4);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (6,2,5);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (7,2,1);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (8,3,6);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (9,3,7);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (10,3,1);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (11,4,8);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (12,4,1);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (13,4,2);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (14,5,2);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (15,5,3);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (16,5,4);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (17,6,4);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (18,6,6);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (19,6,5);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (20,7,2);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (21,7,3);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (22,7,4);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (23,8,5);
INSERT INTO worcation_amenity (worc_amenity_no, worcation_no, amenity_no) VALUES (24,8,6);

-- WorcationPartner 테이블 더미데이터 60개
INSERT INTO worcation_partner (worcation_no, ref_writer_no, company_no, company_people, start_date, end_date, approve, create_at, update_at) VALUES
(1, 1, 1, 15, '2024-03-01', '2024-03-05', 'Y', '2024-02-20 10:30:00', '2024-02-20 10:30:00'),
(2, 2, 3, 8, '2024-03-10', '2024-03-15', 'W', '2024-02-25 14:20:00', '2024-02-25 14:20:00'),
(3, 3, 2, 12, '2024-04-01', '2024-04-07', 'N', '2024-03-15 09:45:00', '2024-03-15 09:45:00'),
(4, 4, 4, 20, '2024-04-15', '2024-04-20', 'Y', '2024-04-01 16:30:00', '2024-04-01 16:30:00'),
(1, 2, 1, 6, '2024-05-01', '2024-05-03', 'W', '2024-04-20 11:15:00', '2024-04-20 11:15:00'),
(2, 3, 4, 18, '2024-05-10', '2024-05-17', 'Y', '2024-04-28 13:40:00', '2024-04-28 13:40:00'),
(3, 1, 2, 10, '2024-06-01', '2024-06-05', 'N', '2024-05-18 08:20:00', '2024-05-18 08:20:00'),
(4, 4, 3, 14, '2024-06-15', '2024-06-22', 'Y', '2024-06-01 15:10:00', '2024-06-01 15:10:00'),
(1, 3, 4, 9, '2024-07-01', '2024-07-04', 'W', '2024-06-20 10:50:00', '2024-06-20 10:50:00'),
(2, 1, 2, 16, '2024-07-10', '2024-07-16', 'Y', '2024-06-25 12:30:00', '2024-06-25 12:30:00'),
(3, 4, 1, 7, '2024-08-01', '2024-08-05', 'N', '2024-07-15 14:45:00', '2024-07-15 14:45:00'),
(4, 2, 3, 22, '2024-08-15', '2024-08-25', 'Y', '2024-08-01 09:20:00', '2024-08-01 09:20:00'),
(1, 1, 2, 11, '2024-09-01', '2024-09-06', 'W', '2024-08-18 16:40:00', '2024-08-18 16:40:00'),
(2, 3, 4, 5, '2024-09-10', '2024-09-12', 'Y', '2024-08-28 11:25:00', '2024-08-28 11:25:00'),
(3, 2, 1, 19, '2024-10-01', '2024-10-08', 'N', '2024-09-20 13:15:00', '2024-09-20 13:15:00'),
(4, 4, 3, 13, '2024-10-15', '2024-10-20', 'Y', '2024-10-01 15:50:00', '2024-10-01 15:50:00'),
(1, 2, 4, 8, '2024-11-01', '2024-11-04', 'W', '2024-10-20 10:10:00', '2024-10-20 10:10:00'),
(2, 1, 2, 17, '2024-11-10', '2024-11-17', 'Y', '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(3, 3, 1, 6, '2024-12-01', '2024-12-03', 'N', '2024-11-18 09:40:00', '2024-11-18 09:40:00'),
(4, 4, 3, 21, '2024-12-15', '2024-12-22', 'Y', '2024-12-01 12:20:00', '2024-12-01 12:20:00'),
(1, 3, 2, 14, '2025-01-05', '2025-01-10', 'W', '2024-12-20 16:15:00', '2024-12-20 16:15:00'),
(2, 2, 4, 9, '2025-01-15', '2025-01-18', 'Y', '2025-01-01 11:50:00', '2025-01-01 11:50:00'),
(3, 1, 1, 12, '2025-02-01', '2025-02-07', 'N', '2025-01-20 13:35:00', '2025-01-20 13:35:00'),
(4, 4, 3, 18, '2025-02-15', '2025-02-25', 'Y', '2025-02-01 08:45:00', '2025-02-01 08:45:00'),
(1, 2, 2, 7, '2025-03-01', '2025-03-04', 'W', '2025-02-18 15:20:00', '2025-02-18 15:20:00'),
(2, 3, 4, 16, '2025-03-10', '2025-03-17', 'Y', '2025-02-25 10:40:00', '2025-02-25 10:40:00'),
(3, 1, 1, 11, '2025-04-01', '2025-04-06', 'N', '2025-03-20 14:25:00', '2025-03-20 14:25:00'),
(4, 4, 3, 20, '2025-04-15', '2025-04-22', 'Y', '2025-04-01 09:15:00', '2025-04-01 09:15:00'),
(1, 1, 4, 5, '2025-05-01', '2025-05-02', 'W', '2025-04-20 12:50:00', '2025-04-20 12:50:00'),
(2, 2, 2, 15, '2025-05-10', '2025-05-16', 'Y', '2025-04-28 16:30:00', '2025-04-28 16:30:00'),
(3, 3, 1, 8, '2025-06-01', '2025-06-05', 'N', '2025-05-18 11:10:00', '2025-05-18 11:10:00'),
(4, 4, 3, 19, '2025-06-15', '2025-06-24', 'Y', '2025-06-01 13:45:00', '2025-06-01 13:45:00'),
(1, 2, 4, 10, '2025-07-01', '2025-07-06', 'W', '2025-06-20 08:55:00', '2025-06-20 08:55:00'),
(2, 1, 2, 13, '2025-07-10', '2025-07-15', 'Y', '2025-06-25 15:35:00', '2025-06-25 15:35:00'),
(3, 3, 1, 6, '2025-08-01', '2025-08-03', 'N', '2025-07-18 10:20:00', '2025-07-18 10:20:00'),
(4, 4, 3, 22, '2025-08-15', '2025-08-27', 'Y', '2025-08-01 14:15:00', '2025-08-01 14:15:00'),
(1, 1, 2, 9, '2025-09-01', '2025-09-05', 'W', '2025-08-18 12:05:00', '2025-08-18 12:05:00'),
(2, 2, 4, 17, '2025-09-10', '2025-09-18', 'Y', '2025-08-28 16:40:00', '2025-08-28 16:40:00'),
(3, 3, 1, 12, '2025-10-01', '2025-10-07', 'N', '2025-09-20 09:25:00', '2025-09-20 09:25:00'),
(4, 4, 3, 14, '2025-10-15', '2025-10-21', 'Y', '2025-10-01 11:50:00', '2025-10-01 11:50:00'),
(1, 2, 4, 7, '2025-11-01', '2025-11-04', 'W', '2025-10-20 15:10:00', '2025-10-20 15:10:00'),
(2, 1, 2, 18, '2025-11-10', '2025-11-19', 'Y', '2025-10-25 13:30:00', '2025-10-25 13:30:00'),
(3, 3, 1, 8, '2025-12-01', '2025-12-05', 'N', '2025-11-18 08:45:00', '2025-11-18 08:45:00'),
(4, 4, 3, 21, '2025-12-15', '2025-12-24', 'Y', '2025-12-01 10:15:00', '2025-12-01 10:15:00'),
(1, 1, 2, 11, '2024-02-01', '2024-02-05', 'W', '2024-01-20 14:20:00', '2024-01-20 14:20:00'),
(2, 2, 4, 16, '2024-02-10', '2024-02-17', 'Y', '2024-01-28 11:35:00', '2024-01-28 11:35:00'),
(3, 3, 1, 9, '2024-01-15', '2024-01-19', 'N', '2024-01-01 15:50:00', '2024-01-01 15:50:00'),
(4, 4, 3, 13, '2024-01-25', '2024-01-30', 'Y', '2024-01-10 12:40:00', '2024-01-10 12:40:00'),
(1, 2, 2, 6, '2024-05-20', '2024-05-22', 'W', '2024-05-08 09:55:00', '2024-05-08 09:55:00'),
(2, 1, 4, 19, '2024-06-25', '2024-07-02', 'Y', '2024-06-15 16:25:00', '2024-06-15 16:25:00'),
(3, 3, 1, 10, '2024-07-20', '2024-07-25', 'N', '2024-07-08 13:10:00', '2024-07-08 13:10:00'),
(4, 4, 3, 15, '2024-08-10', '2024-08-17', 'Y', '2024-07-30 10:45:00', '2024-07-30 10:45:00'),
(1, 1, 2, 8, '2024-09-20', '2024-09-24', 'W', '2024-09-08 14:30:00', '2024-09-08 14:30:00'),
(2, 2, 4, 12, '2024-10-25', '2024-10-31', 'Y', '2024-10-15 11:20:00', '2024-10-15 11:20:00'),
(3, 3, 1, 7, '2024-11-20', '2024-11-23', 'N', '2024-11-08 15:40:00', '2024-11-08 15:40:00'),
(4, 4, 3, 17, '2024-12-10', '2024-12-18', 'Y', '2024-11-30 09:05:00', '2024-11-30 09:05:00'),
(1, 2, 2, 14, '2025-01-20', '2025-01-26', 'W', '2025-01-08 12:15:00', '2025-01-08 12:15:00'),
(2, 1, 4, 9, '2025-02-25', '2025-02-28', 'Y', '2025-02-15 16:50:00', '2025-02-15 16:50:00'),
(3, 3, 1, 11, '2025-03-20', '2025-03-26', 'N', '2025-03-08 13:25:00', '2025-03-08 13:25:00'),
(4, 4, 3, 20, '2025-04-25', '2025-05-02', 'Y', '2025-04-15 10:35:00', '2025-04-15 10:35:00'),
(1, 1, 2, 5, '2025-05-20', '2025-05-21', 'W', '2025-05-08 14:40:00', '2025-05-08 14:40:00');
SET SQL_SAFE_UPDATES = 0;
UPDATE member
SET user_pwd = '{bcrypt}$2a$10$iZqHgXoFNRQ033syrI9ZS.NBW2R721A7iNgEA4h00gXw4GZUXx4Ta';
SET SQL_SAFE_UPDATES = 1; 

select*from member;