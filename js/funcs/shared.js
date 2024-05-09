import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken, showSwal } from "./utils.js";

const showUserNameInNavbar = () => {
  const navbarProfileBox = document.querySelector(".main-header__profile");
  const isUserLogin = isLogin();

  if (isUserLogin) {
    const userInfos = getMe().then((data) => {
      navbarProfileBox.setAttribute("href", "index.html");
      navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    navbarProfileBox.setAttribute("href", "login.html");
    navbarProfileBox.innerHTML =
      '<span class="main-header__profile-text">ثبت نام / ورود</span> ';
  }
};

const renderTopbarMenus = async () => {
  const topBarList = document.querySelector(".top-bar__menu");

  const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
  const topbarMenus = await res.json();

  topBarList.innerHTML = "";

  const shuffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random());

  shuffledArray.slice(0, 6).map((menu) => {
    topBarList.innerHTML += `<li class="top-bar__item">
      <a href="#" class="top-bar__link">${menu.title}</a>
    </li>`;
  });
};

const getAndShowAllCourses = async () => {
  const coursesContainer = document.querySelector("#courses-container");

  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = await res.json();

  courses.slice(0, 6).map((course) => {
    console.log(course);
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col-4">
                <div class="course-box">
                  <a href="course.html?name=${course.shortName}">
                    <img src=http://localhost:4000/courses/covers/${course.cover
      } alt="Course img" class="course-box__img" />
                  </a>
                  <div class="course-box__main">
                    <a href="course.html?name=${course.shortName
      }" class="course-box__title">${course.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${course.creator
      }</a>
                      </div>
                      <div class="course-box__rating">
                      ${Array(5 - course.courseAverageScore)
        .fill(0)
        .map(
          (score) =>
            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
        )
        .join("")}
                      ${Array(course.courseAverageScore)
        .fill(0)
        .map(
          (score) =>
            '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
        )
        .join("")}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${course.registers
      }</span>
                      </div>
                      <span class="course-box__price">${course.price === 0
        ? "رایگان"
        : course.price.toLocaleString()
      }</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                  </div>

                </div>
              </div>
    `
    );
  });
  return courses;
};

const getAndShowPopularCourses = async () => {
  const popularCoursesWrapper = document.querySelector(
    "#popular-courses-wrapper"
  );

  const res = await fetch(`http://localhost:4000/v1/courses/popular`);
  const popularCourses = await res.json();

  popularCourses.forEach((course) => {
    popularCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://localhost:4000/courses/covers/${course.cover
      } alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
            <img src="images/svgs/star.svg" alt="rating" class="course-box__star">
            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()
      }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>
    `
    );
  });

  return popularCourses;
};

const getAndShowPresellCourses = async () => {
  const presellCoursesWrapper = document.querySelector(
    "#presell-courses-wrapper"
  );

  const res = await fetch(`http://localhost:4000/v1/courses/presell`);
  const presellCourses = await res.json();

  presellCourses.forEach((course) => {
    presellCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://localhost:4000/courses/covers/${course.cover
      } alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
          ${Array(5 - course.courseAverageScore)
        .fill(0)
        .map(
          (score) =>
            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
        )
        .join("")}
          ${Array(course.courseAverageScore)
        .fill(0)
        .map(
          (score) =>
            '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
        )
        .join("")}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price
      }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>
    `
    );
  });

  return presellCourses;
};

const getAndShowArticles = async () => {
  const articlesWrapper = document.querySelector("#articles-wrapper");

  const res = await fetch(`http://localhost:4000/v1/articles`);
  const articles = await res.json();

  articles.slice(0, 6).forEach((article) => {
    articlesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col-4">
    <div class="article-card">
      <div class="article-card__header">
        <a href="#" class="article-card__link-img">
          <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
        </a>
      </div>
      <div class="article-card__content">
        <a href="#" class="article-card__link">
          ${article.title}
        </a>
        <p class="article-card__text">
        ${article.description}
        </p>
        <a href="#" class="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>
    `
    );
  });

  return articles;
};

const getAndShowNavbarMenus = async () => {
  const menusWrapper = document.querySelector("#menus-wrapper");

  const res = await fetch(`http://localhost:4000/v1/menus`);
  const menus = await res.json();

  menus.forEach((menu) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <li class="main-header__item">
    <a href=category.html?cat=${menu.href} class="main-header__link">${menu.title
      }
      ${menu.submenus.length !== 0
        ? `<i class="fas fa-angle-down main-header__link-icon"></i>
        <ul class="main-header__dropdown">
        ${menu.submenus
          .map(
            (submenu) =>
              `<li class="main-header__dropdown-item">
            <a href="#" class="main-header__dropdown-link">
             ${submenu.title}
            </a>
          </li>`
          )
          .join("")}
        </ul>`
        : ""
      }
    </a>
  </li>
    `
    );
  });

  return menus;
};

const getAndShowCategoryCourses = async () => {
  const categoryName = getUrlParam("cat");

  const res = await fetch(
    `http://localhost:4000/v1/courses/category/${categoryName}`
  );
  const courses = await res.json();

  return courses;
};

const insertCourseBoxHtmlTemplate = (courses, showType, parentElement) => {
  parentElement.innerHTML = "";

  if (showType === "row") {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
            <div class="col-4">
            <div class="course-box">
              <a href="#">
                <img src="images/courses/js_project.png" alt="Course img" class="course-box__img" />
              </a>
              <div class="course-box__main">
                <a href="#" class="course-box__title">${course.name}</a>
        
                <div class="course-box__rating-teacher">
                  <div class="course-box__teacher">
                    <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                    <a href="#" class="course-box__teacher-link">${course.creator
        }</a>
                  </div>
                  <div class="course-box__rating">
                    ${Array(5 - course.courseAverageScore)
          .fill(0)
          .map(
            (score) =>
              '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
          )
          .join("")}
                    ${Array(course.courseAverageScore)
          .fill(0)
          .map(
            (score) =>
              '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
          )
          .join("")}
                  </div>
                </div>
        
                <div class="course-box__status">
                  <div class="course-box__users">
                    <i class="fas fa-users course-box__users-icon"></i>
                    <span class="course-box__users-text">${course.registers
        }</span>
                  </div>
                  <span class="course-box__price">${course.price === 0
          ? "رایگان"
          : course.price.toLocaleString()
        }</span>
                </div>
              </div>
        
              <div class="course-box__footer">
                <a href="#" class="course-box__footer-link">
                  مشاهده اطلاعات
                  <i class="fas fa-arrow-left course-box__footer-icon"></i>
                </a>
              </div>
        
            </div>
          </div>
            `
      );
    });
  } else {
    courses.forEach((course) => {
      parentElement.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-12">
      <div class="course-box">
          <div class="course__box-header">
              <div class="course__box-right">
                  <a class="course__box-right-link" href="#">
                      <img src=http://localhost:4000/courses/covers/${course.cover} class="course__box-right-img">
                  </a>
              </div>
              <div class="course__box-left">
                  <div class="course__box-left-top">
                      <a href="#" class="course__box-left-link">${course.name
        }</a>
                  </div>
                  <div class="course__box-left-center">
                      <div class="course__box-left-teacher">
                          <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                          <span class="course__box-left-name">${course.creator
        }</span>
                      </div>
                      <div class="course__box-left-stars">
                        ${Array(5 - course.courseAverageScore)
          .fill(0)
          .map(
            (score) =>
              '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
          )
          .join("")}
                        ${Array(course.courseAverageScore)
          .fill(0)
          .map(
            (score) =>
              '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
          )
          .join("")}
                      </div>
                  </div>
                  <div class="course__box-left-bottom">
                      <div class="course__box-left-des">
                          <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                              که
                              حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                              سازی
                              نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                              شما هم
                              اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                              کاربردی
                              که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                      </div>
                  </div>
                  <div class="course__box-footer">
                      <div class="course__box-footer-right">
                          <i class="course__box-footer-icon fa fa-users"></i>
                          <span class="course__box-footer-count">${course.registers
        }</span>
                      </div>
                      <span class="course__box-footer-left">${course.price === 0
          ? "رایگان"
          : course.price.toLocaleString()
        }</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `
      );
    });
  }
};

const coursesSorting = (array, filterMethod) => {
  let outputArray = [];

  switch (filterMethod) {
    case "free": {
      outputArray = array.filter((course) => course.price === 0);
      break;
    }
    case "money": {
      outputArray = array.filter((course) => course.price !== 0);
      break;
    }
    case "first": {
      outputArray = [...array].reverse();
      break;
    }
    case "last": {
      outputArray = array;
      break;
    }
    case "default": {
      outputArray = array;
      break;
    }
    default: {
      outputArray = array;
    }
  }

  return outputArray;
};

const getCourseDetails = () => {
  const courseShortName = getUrlParam("name");
  const courseInfoLink = document.querySelector(".course-info__link")
  const courseInfoTitle = document.querySelector(".course-info__title")
  const courseInfoDescription = document.querySelector(".course-info__text")
  const courseInfoRegisterTitle = document.querySelector(".course-info__register-title")
  const coursInfoStatus = document.querySelector(".course-boxes__box-left--subtitle")
  const courseInfoSupport = document.querySelector('.subtitle-support')
  const courseInfoupdatedAt = document.querySelector('.subtitle-updatedAt')
  const courseInfoTotalSaleNumber = document.querySelector('.course-info__total-sale-number')
  const courseInfoCountText = document.querySelector('.course-info__total-comment-text')
  const courseInfoSectionWrapper = document.querySelector('.section-wrapper')


  fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((course) => {
      console.log(course);
      courseInfoLink.innerHTML = course.categoryID.title;
      courseInfoTitle.innerHTML = course.name;
      courseInfoDescription.innerHTML = course.description;
      courseInfoRegisterTitle.insertAdjacentHTML("beforeend", course.isUserRegisteredToThisCourse ? "شما دانشجوی این دوره هستید." : "ثبت نام در دوره")
      coursInfoStatus.insertAdjacentHTML("beforeend", course.isComplate === 0 ? "اتمام دوره " : "در حال برگزاری")
      courseInfoSupport.innerHTML = course.support
      courseInfoupdatedAt.innerHTML = course.updatedAt.slice(0, 10);
      courseInfoTotalSaleNumber.innerHTML = course.courseStudentsCount;
      courseInfoCountText.innerHTML = `${course.comments.length} دیدگاه`

      if (course.sessions.length) {
        course.sessions.forEach((section, index) => {
          courseInfoSectionWrapper.insertAdjacentHTML('beforeend', `
          <div class="accordion-body introduction__accordion-body">
          <div class="introduction__accordion-right">
            <span class="introduction__accordion-count">${index + 1
            }</span>
            <i class="fab fa-youtube introduction__accordion-icon"></i>
            ${section.free || course.isUserRegisteredToThisCourse
              ? `
                  <a href="episode.html?name${course.shortName}&id=${section._id}" class="introduction__accordion-link">
                    ${section.title}
                  </a>
              `
              : `
                  <span class="introduction__accordion-link">
                    ${section.title}
                  </span>
         
              `
            }
            </div>
          <div class="introduction__accordion-left">
            <span class="introduction__accordion-time">
              ${section.time}
            </span>
            ${!(section.free || course.isUserRegisteredToThisCourse)
              ? `
                <i class="fa fa-lock"></i>
              `
              : ""
            }
          </div>
        </div>
    `
          );
        });
      } else {
        courseInfoSectionWrapper.insertAdjacentHTML('beforeend', `
        <div class="accordion-body introduction__accordion-body">
                          <div class="introduction__accordion-right">
                            <span class="introduction__accordion-count">--</span>
                            <i class="fab fa-youtube introduction__accordion-icon"></i>
                            <a href="#" class="introduction__accordion-link">
                             دوره ای وجود ندارد
                            </a>
                          </div>
                          <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                             00:00
                            </span>
                          </div>
                        </div>
        `)
      }
    });
};

const getCoursesRelated = async () => {
  const ShortNAme = getUrlParam('name')
  const coursesWrapperRellated = document.querySelector('.courses-wrapper-rellated')
  const res = await fetch(`http://localhost:4000/v1/courses/related/${ShortNAme}`)
  const Related = await res.json()

  if (Related.length) {
    Related.forEach(course => {
      coursesWrapperRellated.insertAdjacentHTML("beforeend", `
    <li class="course-info__courses-list-item">
    <a href="#" class="course-info__courses-link">
      <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Cover" class="course-info__courses-img" />
      <span class="course-info__courses-text">
       ${course.name}
      </span>
    </a>
  </li>
  
    `)
    })
  } else {
    coursesWrapperRellated.insertAdjacentHTML("beforeend", `
 دوره مرتبطی وجود ندارد!

  `)
  }

  return Related
};


const getSessionDetails = async () => {
  const courseShortName = getUrlParam("name");
  const sessionID = getUrlParam("id");

  const sessionVideoElem = document.querySelector(".episode-content__video");
  const courseSessionsListElem = document.querySelector(".sidebar-topics__list");

  const res = await fetch(
    `http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const responseData = await res.json();
  console.log(responseData);

  sessionVideoElem.setAttribute(
    "src",
    `http://localhost:4000/courses/covers/${responseData.sessions.video}`
  );
  responseData.sessions.forEach((session) => {
    courseSessionsListElem.insertAdjacentHTML(
      "beforeend",
      `
        <li class="sidebar-topics__list-item">
          <div class="sidebar-topics__list-right">
            <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"></path></svg><!-- <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i> Font Awesome fontawesome.com -->
            ${session.free
        ? `
                <a class="sidebar-topics__list-item-link" href="episode.html?name${courseShortName}&id=${session._id}">${session.title}</a>
              `
        : `
                <span class="sidebar-topics__list-item-link">${session.title}</span>
              `
      }
          </div>
          <div class="sidebar-topics__list-left">
            <span class="sidebar-topics__list-item-time">${session.time}</span>
          </div>
        </li>
    `
    );
  });

  return responseData;
};

const getContactUsMsg = async () => {
  const nameInput = document.querySelector('#name')
  const emailInput = document.querySelector('#email')
  const phoneInput = document.querySelector('#phone')
  const bodyInput = document.querySelector('#body')

  const resultImputContact = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    body: bodyInput.value.trim(),

  }

  const res = await fetch (`http://localhost:4000/v1/contact` , {
    method : 'POST',
    headers :{
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(resultImputContact)
  })
  const result = res.json()
  if (res.status === 201) {
    showSwal(
      "پیغام شما با موفقیت ارسال شد",
      "success",
      "ورود به پنل",
      (result) => {
        location.href = "index.html";
      }
    );
  } else {
    showSwal(
      "مشکلی در ارسال پیغام وجود دارد \n لطفا بعدا تست کنید",
      "error",
      "ای بابا",
      () => {}
    );
  }
};
const createNewNewsLetter = async () => {
  const newsLetterInput = document.querySelector('#news-letter-input')

  console.log(newsLetterInput);
  const newNewsLetterEmailObj = {
    email: newsLetterInput.value.trim()
  }

  const res = await fetch(`http://localhost:4000/v1/newsletters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNewsLetterEmailObj)
  })

  console.log(res);

  if (res.ok) {
    showSwal(
      "با موفقیت در خبرنامه سبزلرن عضو شدید",
      "success",
      "متوجه شدم",
      () => {}
    );
  }
}


export {
  showUserNameInNavbar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenus,
  getAndShowCategoryCourses,
  insertCourseBoxHtmlTemplate,
  coursesSorting,
  getCourseDetails,
  getCoursesRelated,
  getSessionDetails,
  getContactUsMsg,
  createNewNewsLetter
};
