export interface QuizQuestion {
  id: number;
  topic: string;
  topicName: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  codeSnippet?: string;
  options: string[];
  correct: number; // 0-indexed: 0=A, 1=B, 2=C, 3=D
  explanation: string;
}

export interface QuizTopicMeta {
  id: string;
  name: string;
  slug: string;
  iconSlug: string;
  description: string;
  badge?: string;
  categoryGroup: 'fe' | 'be' | 'devops' | 'all';
}

export const QUIZ_TOPICS: QuizTopicMeta[] = [
  {
    id: 'all',
    name: 'Đa Chủ Đề (Tổng Hợp)',
    slug: 'all',
    iconSlug: 'all',
    description: 'Thử thách tổng hợp kiến thức từ Frontend, Backend, DevOps, Database và System Design.',
    badge: 'HOT',
    categoryGroup: 'all'
  },
  {
    id: 'frontend',
    name: 'Frontend (FE Tổng Hợp)',
    slug: 'frontend',
    iconSlug: 'frontend-essentials',
    description: 'Bao gồm HTML5, CSS3, JavaScript ES6+, React, Web Vitals, Rendering và Browser APIs.',
    badge: 'PHỔ BIẾN',
    categoryGroup: 'fe'
  },
  {
    id: 'backend',
    name: 'Backend (BE Tổng Hợp)',
    slug: 'backend',
    iconSlug: 'backend-essentials',
    description: 'Kiến trúc API, REST, Authentication, Microservices, Caching, Queue và Database Design.',
    badge: 'PHỔ BIẾN',
    categoryGroup: 'be'
  },
  {
    id: 'javascript',
    name: 'JavaScript (JS)',
    slug: 'javascript',
    iconSlug: 'javascript',
    description: 'Event Loop, Closure, Prototype, Asynchronous (Promise/Async-Await), Scope và ES6+ features.',
    badge: 'CORE',
    categoryGroup: 'fe'
  },
  {
    id: 'html',
    name: 'HTML & Semantic Web',
    slug: 'html',
    iconSlug: 'html',
    description: 'Semantic tags, DOM structure, Form validation, Storage APIs, SEO & Accessibility (a11y).',
    categoryGroup: 'fe'
  },
  {
    id: 'css',
    name: 'CSS & Modern Layout',
    slug: 'css',
    iconSlug: 'css',
    description: 'Box Model, Flexbox, CSS Grid, Stacking Context, Specificity, BFC, Animations và Responsive.',
    categoryGroup: 'fe'
  },
  {
    id: 'react',
    name: 'React & Hooks',
    slug: 'react',
    iconSlug: 'react',
    description: 'Lifecycle, Hooks (useEffect, useMemo, useCallback), Virtual DOM, State Management và React 18/19.',
    categoryGroup: 'fe'
  },
  {
    id: 'java',
    name: 'Java & Spring Boot',
    slug: 'java',
    iconSlug: 'java',
    description: 'JVM Memory, OOP, Collections, Multi-threading, Exception handling, Spring Bean và Hibernate.',
    badge: 'ENTERPRISE',
    categoryGroup: 'be'
  },
  {
    id: 'dotnet',
    name: '.NET (C#) & ASP.NET Core',
    slug: 'dotnet',
    iconSlug: 'dotnet',
    description: 'CLR, Value vs Reference types, LINQ, Async/Await, Dependency Injection và EF Core.',
    badge: 'ENTERPRISE',
    categoryGroup: 'be'
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    slug: 'docker',
    iconSlug: 'docker-kubernetes',
    description: 'Dockerfile instructions, Multi-stage build, Image layers, Volumes, Network và Compose.',
    badge: 'DEVOPS',
    categoryGroup: 'devops'
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    slug: 'nodejs',
    iconSlug: 'nodejs',
    description: 'libuv, Non-blocking I/O, Event Loop phases, Streams, Buffers, Middleware và Security.',
    categoryGroup: 'be'
  },
  {
    id: 'database',
    name: 'Database & SQL',
    slug: 'database',
    iconSlug: 'database-essentials',
    description: 'RDBMS, ACID, Indexing (B-Tree), Transactions, Normalization, Query Optimization và NoSQL.',
    categoryGroup: 'be'
  }
];

export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // HTML (12 câu)
  // ==========================================
  {
    id: 101,
    topic: 'html',
    topicName: 'HTML',
    level: 'beginner',
    question: 'Khai báo `<!DOCTYPE html>` ở dòng đầu tiên của tài liệu HTML có vai trò quan trọng nhất là gì?',
    options: [
      'Cho phép tải thư viện JavaScript mới nhất',
      'Kích hoạt trình duyệt render trang ở Standards Mode thay vì Quirks Mode',
      'Định nghĩa tài liệu sử dụng ngôn ngữ tiếng Việt',
      'Bắt buộc trình duyệt phải nạp mã CSS theo chuẩn CSS3'
    ],
    correct: 1,
    explanation: '<!DOCTYPE html> thông báo cho trình duyệt biết tài liệu tuân theo tiêu chuẩn HTML5 hiện đại, ngăn trình duyệt chuyển sang Quirks Mode (chế độ tương thích ngược với các lỗi cũ của IE5/6).'
  },
  {
    id: 102,
    topic: 'html',
    topicName: 'HTML',
    level: 'beginner',
    question: 'Sự khác biệt kỹ thuật cơ bản nhất giữa Block-level element và Inline element là gì?',
    options: [
      'Block element luôn có màu nền mặc định, inline không có',
      'Block element bắt đầu dòng mới và nhận width/height; inline element nằm cùng dòng văn bản và phớt lờ width/height (trừ replaced element)',
      'Inline element chỉ được chứa chữ, block element chỉ được chứa hình ảnh',
      'Block element chạy trên client, inline element chạy trên server'
    ],
    correct: 1,
    explanation: 'Block element (<div>, <p>) mặc định chiếm 100% chiều rộng container và chấp nhận width/height. Inline element (<span>, <a>) chiếm đúng độ dài nội dung, không ngắt dòng và không nhận width/height (ngoại trừ replaced elements như <img>, <video>).'
  },
  {
    id: 103,
    topic: 'html',
    topicName: 'HTML',
    level: 'intermediate',
    question: 'Khi nhúng file script vào trang, thuộc tính `defer` khác thuộc tính `async` như thế nào?',
    codeSnippet: '<script src="app.js" defer></script>\n<script src="analytics.js" async></script>',
    options: [
      '`async` giữ nguyên thứ tự thực thi trong file HTML; `defer` tải xong cái nào chạy cái đó',
      '`defer` tải song song và thực thi sau khi HTML parser hoàn thành (trước DOMContentLoaded), bảo đảm thứ tự; `async` tải song song và thực thi ngay khi tải xong (không bảo đảm thứ tự)',
      '`defer` chỉ dùng cho CSS, `async` chỉ dùng cho JS',
      '`defer` chặn hoàn toàn việc parse HTML cho đến khi script chạy xong'
    ],
    correct: 1,
    explanation: 'Cả hai đều tải bất đồng bộ không chặn HTML parser. Nhưng `defer` chờ HTML parse xong mới chạy và tôn trọng thứ tự khai báo trong mã nguồn, rất phù hợp cho app logic. `async` thì tải xong lúc nào là ngắt parser chạy ngay lúc đó, thích hợp cho mã độc lập như Google Analytics.'
  },
  {
    id: 104,
    topic: 'html',
    topicName: 'HTML',
    level: 'intermediate',
    question: 'Phát biểu nào sau đây đúng nhất về sự khác biệt ngữ nghĩa giữa `<article>` và `<section>`?',
    options: [
      '`<article>` chỉ được dùng tối đa 1 lần trên 1 trang web',
      '`<article>` đại diện cho khối nội dung có thể đứng độc lập và vẫn có nghĩa hoàn chỉnh; `<section>` đại diện cho một phần nội dung theo chủ đề trong mạch bài viết',
      '`<section>` bắt buộc phải nằm bên trong `<article>`, không thể lồng ngược lại',
      '`<article>` dành cho báo chí, còn `<section>` dành cho trang thương mại điện tử'
    ],
    correct: 1,
    explanation: 'Quy tắc thử nghiệm: Nếu đem khối đó sang một trang khác hoặc RSS feed mà người đọc vẫn hiểu độc lập (như 1 bài blog, 1 comment, 1 tweet, 1 thẻ sản phẩm) thì dùng `<article>`. Nếu nó chỉ là một chương mục của bài viết thì dùng `<section>`. Chúng có thể lồng nhau hai chiều.'
  },
  {
    id: 105,
    topic: 'html',
    topicName: 'HTML',
    level: 'beginner',
    question: 'Thẻ `<meta name="viewport" content="width=device-width, initial-scale=1.0">` có tác dụng gì?',
    options: [
      'Khóa tính năng xoay ngang màn hình của điện thoại',
      'Thiết lập chiều rộng viewport bằng chiều rộng màn hình vật lý của thiết bị và đặt mức zoom ban đầu là 100%',
      'Tự động thu nhỏ ảnh cho vừa màn hình điện thoại',
      'Bật chế độ tiết kiệm pin trên trình duyệt di động'
    ],
    correct: 1,
    explanation: 'Nếu thiếu meta viewport, trình duyệt di động sẽ giả định trang web được thiết kế cho màn hình desktop 980px và thu nhỏ (zoom out) toàn bộ trang khiến chữ trở nên li ti.'
  },
  {
    id: 106,
    topic: 'html',
    topicName: 'HTML',
    level: 'intermediate',
    question: 'Khi upload file ảnh hoặc tài liệu bằng thẻ `<form>`, thuộc tính `enctype` bắt buộc phải là gì?',
    options: [
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'text/plain',
      'application/json'
    ],
    correct: 1,
    explanation: 'Khi form có `<input type="file">`, phương thức phải là `POST` và `enctype="multipart/form-data"` để dữ liệu file nhị phân được chia thành nhiều phần (chunks) gửi lên server.'
  },
  {
    id: 107,
    topic: 'html',
    topicName: 'HTML',
    level: 'intermediate',
    question: 'Tại sao nên dùng thẻ `<button>` thay vì `<div onclick="...">` khi tạo nút bấm tương tác?',
    options: [
      '`<button>` chạy nhanh hơn vì được xử lý bằng GPU',
      '`<button>` có sẵn hỗ trợ trợ năng (Accessibility), nhận focus qua phím Tab, kích hoạt bằng phím Enter/Space và hỗ trợ thuộc tính disabled tự nhiên',
      '`<div>` không thể gắn sự kiện click trong HTML5',
      '`<button>` tự động gửi dữ liệu lên Google Analytics'
    ],
    correct: 1,
    explanation: 'Thẻ `<button>` là semantic element có sẵn hành vi bàn phím (Tab, Enter, Space), trạng thái disabled và công bố đúng vai trò (role="button") cho screen reader người khiếm thị mà không cần tự cấu hình lại bằng JS/ARIA.'
  },
  {
    id: 108,
    topic: 'html',
    topicName: 'HTML',
    level: 'advanced',
    question: 'Thẻ `<template>` trong HTML5 có đặc tính đặc biệt nào sau đây?',
    options: [
      'Tự động render thành phần web component ngay khi nạp trang',
      'Nội dung bên trong được phân tích cú pháp (parsed) nhưng KHÔNG được hiển thị lên màn hình, không thực thi script và không tải tài nguyên cho đến khi được JavaScript clone vào DOM',
      'Chỉ dùng để lưu trữ dữ liệu dạng JSON',
      'Nội dung bên trong thẻ sẽ biến mất sau khi người dùng reload trang'
    ],
    correct: 1,
    explanation: 'Thẻ `<template>` đóng vai trò như một bản thiết kế (blueprint). Hình ảnh bên trong thẻ không tải trước, script không chạy trước cho đến khi JavaScript truy cập thuộc tính `.content` và dùng `importNode()` hoặc `cloneNode()` để đưa vào DOM.'
  },
  {
    id: 109,
    topic: 'html',
    topicName: 'HTML',
    level: 'intermediate',
    question: 'Sự khác biệt về dung lượng lưu trữ tối đa giữa `localStorage` và `Cookie` là gì?',
    options: [
      'Cookie lưu được 5MB, localStorage chỉ lưu được 4KB',
      'Cookie lưu tối đa ~4KB và được gửi kèm mỗi HTTP request; localStorage lưu tối đa ~5-10MB và chỉ tồn tại trên client',
      'Cả hai đều có giới hạn lưu trữ là 50MB',
      'Cookie chỉ lưu được text, localStorage lưu được video'
    ],
    correct: 1,
    explanation: 'Cookie sinh ra để gửi metadata (như session token) kèm theo mỗi request lên server nên giới hạn nhỏ (~4KB). localStorage được thiết kế lưu trữ offline phía client nên có dung lượng lớn hơn nhiều (~5MB tùy browser).'
  },
  {
    id: 110,
    topic: 'html',
    topicName: 'HTML',
    level: 'advanced',
    question: 'Thuộc tính `rel="noopener noreferrer"` khi dùng với thẻ `<a target="_blank">` có mục đích bảo mật gì?',
    options: [
      'Ngăn không cho trang đích truy cập vào thuộc tính `window.opener` của trang gốc, phòng tránh tấn công Tabnabbing',
      'Mã hóa đường truyền dữ liệu giữa hai website bằng thuật toán AES',
      'Ngăn chặn Google thu thập liên kết của trang web',
      'Tự động chặn quảng cáo trên trang đích'
    ],
    correct: 0,
    explanation: 'Khi mở tab mới bằng `target="_blank"`, trang mới có thể can thiệp trang cũ qua `window.opener.location = "fake-login.html"` (Tabnabbing). `rel="noopener"` ngắt tham chiếu này, `noreferrer` không gửi kèm HTTP Referer header.'
  },

  // ==========================================
  // CSS (12 câu)
  // ==========================================
  {
    id: 201,
    topic: 'css',
    topicName: 'CSS',
    level: 'beginner',
    question: 'Khi khai báo `box-sizing: border-box`, kích thước `width` của phần tử sẽ bao gồm những gì?',
    options: [
      'Chỉ nội dung (content)',
      'Nội dung + Padding + Border',
      'Nội dung + Margin',
      'Nội dung + Padding + Margin + Border'
    ],
    correct: 1,
    explanation: 'border-box gộp content, padding và border vào kích thước width/height đã đặt. Điều này giúp phần tử không bị phình to ra khi tăng padding hoặc border, giữ bố cục ổn định.'
  },
  {
    id: 202,
    topic: 'css',
    topicName: 'CSS',
    level: 'intermediate',
    question: 'Selector nào sau đây có độ ưu tiên (Specificity) cao nhất trong CSS?',
    options: [
      '`#nav ul.menu li a`',
      '`body div.container p.text:hover`',
      '`#header #logo`',
      '`div#main .content .post p`'
    ],
    correct: 2,
    explanation: 'Specificity được tính theo (ID, Class/Attribute/Pseudo-class, Element). `#header #logo` có 2 ID -> (2, 0, 0), lớn hơn `#nav ul.menu li a` có 1 ID -> (1, 1, 3).'
  },
  {
    id: 203,
    topic: 'css',
    topicName: 'CSS',
    level: 'intermediate',
    question: 'Hiện tượng Margin Collapsing (gộp lề) trong CSS xảy ra trong trường hợp nào?',
    options: [
      'Giữa margin-left và margin-right của hai phần tử inline',
      'Giữa margin-top và margin-bottom theo chiều dọc của các phần tử block nằm kề nhau trong luồng bình thường (normal flow)',
      'Khi sử dụng CSS Grid hoặc Flexbox',
      'Khi phần tử có `position: absolute`'
    ],
    correct: 1,
    explanation: 'Margin Collapsing chỉ xảy ra theo chiều dọc (vertical) giữa các block element nằm kề nhau hoặc giữa cha - con không có padding/border ngăn cách. Khoảng cách thực tế bằng max(margin1, margin2) chứ không cộng dồn.'
  },
  {
    id: 204,
    topic: 'css',
    topicName: 'CSS',
    level: 'intermediate',
    question: 'Trong Flexbox, sự khác biệt giữa `justify-content` và `align-items` là gì?',
    options: [
      '`justify-content` căn chỉnh theo trục chính (main axis); `align-items` căn chỉnh theo trục vuông góc (cross axis)',
      '`justify-content` chỉ dùng cho văn bản; `align-items` chỉ dùng cho hình ảnh',
      '`justify-content` luôn là trục dọc; `align-items` luôn là trục ngang',
      '`justify-content` dùng cho container; `align-items` dùng cho phần tử con'
    ],
    correct: 0,
    explanation: 'Flexbox hoạt động theo hai trục: Main axis (mặc định ngang nếu flex-direction là row) do `justify-content` quản lý; Cross axis (vuông góc với main axis) do `align-items` quản lý.'
  },
  {
    id: 205,
    topic: 'css',
    topicName: 'CSS',
    level: 'intermediate',
    question: 'Đơn vị `rem` trong CSS được tính toán dựa trên giá trị nào?',
    options: [
      'Font-size của phần tử cha trực tiếp (parent element)',
      'Font-size của phần tử gốc `<html>` (root element)',
      'Chiều rộng của khung nhìn màn hình (viewport width)',
      'Chiều cao của màn hình thiết bị'
    ],
    correct: 1,
    explanation: '`rem` = root em. 1rem bằng font-size của phần tử `<html>` (mặc định trình duyệt thường là 16px). Ngược lại, `em` phụ thuộc vào font-size của chính phần tử hoặc phần tử cha gần nhất.'
  },
  {
    id: 206,
    topic: 'css',
    topicName: 'CSS',
    level: 'advanced',
    question: 'Hành động nào sau đây KHÔNG tạo ra một Stacking Context mới trong CSS?',
    options: [
      'Phần tử có `position: absolute` và `z-index: 1`',
      'Phần tử có `opacity: 0.9`',
      'Phần tử có `transform: scale(1.05)`',
      'Phần tử có `color: red` và `margin: 20px`'
    ],
    correct: 3,
    explanation: 'Stacking context được kích hoạt bởi: position (relative/absolute/fixed/sticky) kèm z-index != auto, opacity < 1, transform != none, filter, will-change, v.v. Việc đặt màu sắc hoặc margin thông thường không tạo stacking context.'
  },
  {
    id: 207,
    topic: 'css',
    topicName: 'CSS',
    level: 'advanced',
    question: 'Trong CSS Grid, sự khác biệt giữa `auto-fill` và `auto-fit` khi kết hợp với `minmax()` là gì?',
    codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));',
    options: [
      '`auto-fill` kéo giãn các cột hiện có để lấp đầy container; `auto-fit` giữ nguyên kích thước cột và tạo các cột rỗng',
      '`auto-fit` sẽ thu gọn (collapse) các cột trống thành 0px và giãn các phần tử thực có để lấp đầy hàng; `auto-fill` giữ nguyên các cột trống trên hàng',
      '`auto-fill` chỉ dùng cho số lượng phần tử lẻ; `auto-fit` dùng cho số chẵn',
      'Hai thuộc tính này hoàn toàn giống nhau không có điểm khác'
    ],
    correct: 1,
    explanation: 'Khi container còn chỗ trống: `auto-fill` duy trì các ô trống vô hình ở cuối hàng; còn `auto-fit` sẽ thu hẹp các ô trống đó về 0px và cho phép các item thực tế mở rộng (stretch) lấp kín toàn bộ chiều rộng container.'
  },
  {
    id: 208,
    topic: 'css',
    topicName: 'CSS',
    level: 'intermediate',
    question: 'Tại sao việc tạo hiệu ứng chuyển động (animation) bằng `transform` và `opacity` lại mượt mà hơn (60fps) so với thay đổi `top`, `left` hay `width`?',
    options: [
      '`transform` dùng ít RAM hơn',
      '`transform` và `opacity` được xử lý ở giai đoạn Compositing bởi GPU mà không kích hoạt lại Reflow (Layout) và Repaint trên CPU',
      '`top` và `left` bị giới hạn tốc độ bởi trình duyệt',
      '`transform` tự động bỏ qua kiểm tra CSS specificity'
    ],
    correct: 1,
    explanation: 'Thay đổi top/left/width buộc trình duyệt phải tính toán lại hình học của toàn trang (Reflow/Layout) rồi vẽ lại từng pixel (Repaint) trên CPU. Transform và opacity chỉ cần dịch chuyển lớp hình ảnh đã vẽ sẵn trên GPU (Composite layer), chạy siêu mượt 60-120fps.'
  },

  // ==========================================
  // JAVASCRIPT (14 câu)
  // ==========================================
  {
    id: 301,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'beginner',
    question: 'Kết quả in ra màn hình của đoạn mã sau là gì?',
    codeSnippet: 'console.log(typeof NaN);\nconsole.log(NaN === NaN);',
    options: [
      '"nan" và true',
      '"number" và false',
      '"undefined" và false',
      '"object" và true'
    ],
    correct: 1,
    explanation: 'Trong chuẩn IEEE 754, NaN (Not a Number) là một giá trị số đặc biệt đại diện cho phép tính số học thất bại, nên `typeof NaN` trả về "number". NaN là giá trị duy nhất trong JavaScript không bằng chính nó (`NaN === NaN` trả về false).'
  },
  {
    id: 302,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'intermediate',
    question: 'Thứ tự in ra console của đoạn mã sau theo cơ chế Event Loop là gì?',
    codeSnippet: 'console.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");',
    options: [
      '1 -> 2 -> 3 -> 4',
      '1 -> 4 -> 2 -> 3',
      '1 -> 4 -> 3 -> 2',
      '1 -> 3 -> 4 -> 2'
    ],
    correct: 2,
    explanation: '1 và 4 chạy đồng bộ (Synchronous). Khi Call Stack rỗng, Event Loop ưu tiên giải quyết toàn bộ hàng đợi Microtask (Promise.then in ra 3). Sau khi Microtask hết, Event Loop mới lấy Macrotask tiếp theo (setTimeout in ra 2).'
  },
  {
    id: 303,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'intermediate',
    question: 'Đoạn mã sau in ra giá trị gì do cơ chế Temporal Dead Zone (TDZ)?',
    codeSnippet: 'console.log(a);\nconsole.log(b);\nvar a = 5;\nlet b = 10;',
    options: [
      '5 và 10',
      'undefined và ReferenceError: Cannot access "b" before initialization',
      'undefined và undefined',
      'ReferenceError cho cả hai biến'
    ],
    correct: 1,
    explanation: 'Biến `var a` được hoisting và gán giá trị khởi tạo mặc định là `undefined`. Biến `let b` cũng được hoisting nhưng nằm trong Temporal Dead Zone (vùng chết tạm thời), nếu truy cập trước dòng khai báo sẽ văng ReferenceError.'
  },
  {
    id: 304,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'intermediate',
    question: 'Điểm khác biệt quan trọng nhất về từ khóa `this` giữa Arrow Function và Regular Function là gì?',
    options: [
      'Arrow Function không thể chạy trong Strict Mode',
      'Arrow function không có context `this` riêng mà giữ nguyên giá trị `this` từ phạm vi bao quanh (lexical this); không thể dùng `call()`, `apply()` hay `bind()` để đổi `this` của nó',
      'Regular function không dùng được trong mảng',
      'Arrow function luôn trỏ về đối tượng `window`'
    ],
    correct: 1,
    explanation: 'Arrow function kế thừa `this` từ nơi nó được khai báo (lexical scope). Nó không có thuộc tính `this`, `arguments`, `super`, và không thể dùng làm hàm khởi tạo với toán tử `new`.'
  },
  {
    id: 305,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'intermediate',
    question: 'Đoạn mã sau giải quyết vấn đề kinh điển của vòng lặp `for` với `var` như thế nào?',
    codeSnippet: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
    options: [
      'In ra 0, 1, 2 vì setTimeout chạy theo thứ tự',
      'In ra 3, 3, 3 vì `var` có function scope và giá trị cuối cùng của biến i khi callback chạy là 3',
      'In ra undefined, undefined, undefined',
      'Bị lỗi runtime crash trình duyệt'
    ],
    correct: 1,
    explanation: 'Vì `var` không có block scope, chỉ có 1 biến `i` duy nhất dùng chung. Sau 100ms khi vòng lặp kết thúc, `i` đã bằng 3, nên cả 3 callback đều đọc thấy `i = 3`. Thay `var` bằng `let` sẽ tạo ra một biến `i` mới ở mỗi vòng lặp (block scope) và in ra 0, 1, 2.'
  },
  {
    id: 306,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'advanced',
    question: 'Hàm `Promise.allSettled()` khác với `Promise.all()` ở điểm cốt lõi nào?',
    options: [
      '`Promise.all()` chạy nhanh gấp đôi `Promise.allSettled()`',
      '`Promise.all()` sẽ reject ngay lập tức nếu có 1 promise con thất bại; còn `Promise.allSettled()` luôn chờ TẤT CẢ promise hoàn tất (dù resolve hay reject) và trả về mảng trạng thái',
      '`Promise.allSettled()` chỉ chấp nhận tối đa 3 promises',
      '`Promise.all()` tự động retry khi gặp lỗi mạng'
    ],
    correct: 1,
    explanation: '`Promise.all` theo cơ chế "fail-fast" (một con sâu làm rầu nồi canh). `Promise.allSettled` đảm bảo bạn luôn nhận được kết quả của toàn bộ các tác vụ, mỗi phần tử có `{ status: "fulfilled", value }` hoặc `{ status: "rejected", reason }`.'
  },
  {
    id: 307,
    topic: 'javascript',
    topicName: 'JavaScript',
    level: 'advanced',
    question: 'Tại sao `WeakMap` và `WeakSet` trong JavaScript lại được gọi là "Weak" (yếu)?',
    options: [
      'Vì chúng có dung lượng lưu trữ ít hơn Map/Set thông thường',
      'Vì chúng giữ tham chiếu yếu (weak reference) đến các object key, cho phép Garbage Collector tự do thu hồi bộ nhớ của object đó nếu không còn tham chiếu nào khác',
      'Vì chúng không hỗ trợ các phương thức bất đồng bộ',
      'Vì chúng chỉ chạy được trên Node.js mà không chạy được trên trình duyệt'
    ],
    correct: 1,
    explanation: 'Trong `Map`, nếu bạn dùng một object làm key, object đó sẽ không bao giờ được Garbage Collector giải phóng dù bên ngoài không ai dùng nữa. `WeakMap` giữ tham chiếu yếu, khi object bên ngoài bị gán null, entry trong WeakMap sẽ tự động biến mất, chống memory leak cực tốt.'
  },

  // ==========================================
  // FRONTEND (FE TỔNG HỢP & REACT) (14 câu)
  // ==========================================
  {
    id: 401,
    topic: 'frontend',
    topicName: 'Frontend',
    level: 'intermediate',
    question: 'Thuộc tính `key` trong React list rendering có mục đích quan trọng nhất là gì?',
    options: [
      'Đặt tên class CSS tự động cho phần tử',
      'Giúp thuật toán Reconciliation xác định chính xác phần tử nào bị thêm, sửa, xóa để tái sử dụng DOM node thay vì render lại toàn bộ danh sách',
      'Tăng tốc độ kết nối API của ứng dụng',
      'Lưu trữ dữ liệu trong Redux store'
    ],
    correct: 1,
    explanation: 'React dựa vào `key` để theo dõi danh tính của từng item qua các lần render. Dùng `index` của mảng làm key khi danh sách có thêm/xóa/sắp xếp sẽ làm React cập nhật nhầm state của component con.'
  },
  {
    id: 402,
    topic: 'frontend',
    topicName: 'Frontend',
    level: 'intermediate',
    question: 'Khi nào hàm cleanup trong `useEffect` của React được thực thi?',
    codeSnippet: 'useEffect(() => {\n  const timer = setInterval(() => {}, 1000);\n  return () => clearInterval(timer);\n}, [id]);',
    options: [
      'Chỉ chạy duy nhất một lần khi component unmount khỏi DOM',
      'Chạy trước khi effect mới được kích hoạt lại ở lần re-render tiếp theo VÀ khi component unmount',
      'Chạy đồng thời với lúc render giao diện',
      'Chỉ chạy khi có lỗi exception xảy ra trong component'
    ],
    correct: 1,
    explanation: 'Hàm cleanup chạy dọn dẹp tài nguyên (hủy timer, removeEventListener, cancel fetch) ở hai thời điểm: (1) Ngay trước khi chạy lại effect mới khi dependency thay đổi, và (2) Khi component bị unmount khỏi DOM.'
  },
  {
    id: 403,
    topic: 'frontend',
    topicName: 'Frontend',
    level: 'intermediate',
    question: 'Sự khác biệt cốt lõi giữa `useMemo` và `useCallback` trong React là gì?',
    options: [
      '`useMemo` dùng cho class component; `useCallback` dùng cho function component',
      '`useMemo` ghi nhớ KẾT QUẢ tính toán của một hàm; `useCallback` ghi nhớ chính ĐỊNH NGHĨA BẢN THÂN HÀM ĐÓ giữa các lần render',
      '`useMemo` chạy bất đồng bộ; `useCallback` chạy đồng bộ',
      '`useMemo` chỉ lưu được số; `useCallback` lưu được object'
    ],
    correct: 1,
    explanation: 'Cả hai đều dùng memoization. `useMemo(() => compute(a, b), [a, b])` cache giá trị trả về để tránh tính toán nặng lặp lại. `useCallback(fn, deps)` tương đương `useMemo(() => fn, deps)`, giữ nguyên tham chiếu hàm tránh re-render component con được bọc bởi `React.memo`.'
  },
  {
    id: 404,
    topic: 'frontend',
    topicName: 'Frontend',
    level: 'intermediate',
    question: 'Chỉ số LCP (Largest Contentful Paint) trong bộ chỉ số Core Web Vitals của Google đo lường điều gì?',
    options: [
      'Thời gian phản hồi đầu tiên của server (Time to First Byte)',
      'Thời gian phần tử nội dung lớn nhất (ảnh banner, video poster hoặc khối chữ chính) hiển thị hoàn chỉnh trên màn hình',
      'Mức độ dịch chuyển bất ngờ của các phần tử layout khi tải trang',
      'Độ trễ khi người dùng tương tác click vào nút bấm'
    ],
    correct: 1,
    explanation: 'LCP đo lường tốc độ tải cảm nhận của người dùng, ghi nhận thời điểm khối nội dung trực quan lớn nhất được vẽ lên màn hình. Mục tiêu LCP tốt theo chuẩn Google là dưới 2.5 giây.'
  },
  {
    id: 405,
    topic: 'frontend',
    topicName: 'Frontend',
    level: 'advanced',
    question: 'Trong Next.js App Router (React Server Components), Server Component có khả năng nào mà Client Component không thể làm trực tiếp?',
    options: [
      'Sử dụng các hook như useState và useEffect',
      'Lắng nghe sự kiện click `onClick` và di chuột của người dùng',
      'Truy cập trực tiếp cơ sở dữ liệu hoặc đọc file hệ thống trên server mà không làm tăng kích thước bundle gửi về trình duyệt',
      'Tương tác trực tiếp với LocalStorage của người dùng'
    ],
    correct: 2,
    explanation: 'Server Components chỉ chạy trên server, code của nó không bị gửi về browser (zero bundle size), có thể query trực tiếp DB hoặc gọi API bí mật mà không lộ secret key. Ngược lại nó không có state hay browser events như onClick.'
  },
  {
    id: 406,
    topic: 'frontend',
    topicName: 'Frontend',
    level: 'advanced',
    question: 'Lỗi CORS (Cross-Origin Resource Sharing) xuất hiện trên trình duyệt là do cơ chế nào kiểm soát?',
    options: [
      'Do server từ chối tiếp nhận kết nối TCP của client',
      'Do chính sách Same-Origin Policy được thực thi trực tiếp bởi trình duyệt web để bảo vệ người dùng, server vẫn có thể đã xử lý xong request',
      'Do nhà mạng Internet chặn các gói tin HTTP',
      'Do mã JavaScript bị lỗi cú pháp cú pháp runtime'
    ],
    correct: 1,
    explanation: 'CORS là cơ chế an ninh do TRÌNH DUYỆT áp đặt, không phải lỗi sập server. Thậm chí server đã nhận và xử lý request thành công nhưng nếu thiếu header `Access-Control-Allow-Origin` phù hợp, trình duyệt sẽ chặn không cho JavaScript đọc kết quả.'
  },

  // ==========================================
  // BACKEND (BE TỔNG HỢP & ARCHITECTURE) (14 câu)
  // ==========================================
  {
    id: 501,
    topic: 'backend',
    topicName: 'Backend',
    level: 'intermediate',
    question: 'Phương thức HTTP nào sau đây KHÔNG có tính chất Idempotent (Bảo toàn trạng thái khi gọi lặp lại)?',
    options: ['GET', 'PUT', 'DELETE', 'POST'],
    correct: 3,
    explanation: 'Idempotent nghĩa là gọi 1 lần hay gọi N lần cùng tham số thì trạng thái hệ thống vẫn như nhau. GET, PUT (ghi đè), DELETE (xóa) là idempotent. POST tạo mới tài nguyên, gọi N lần sẽ sinh ra N bản ghi khác nhau.'
  },
  {
    id: 502,
    topic: 'backend',
    topicName: 'Backend',
    level: 'intermediate',
    question: 'Mã trạng thái HTTP nào biểu thị người dùng "Chưa xác thực danh tính (chưa đăng nhập)" và mã nào biểu thị "Đã đăng nhập nhưng không có quyền hạn"?',
    options: [
      '404 Not Found và 500 Internal Error',
      '401 Unauthorized (chưa xác thực) và 403 Forbidden (bị cấm quyền truy cập)',
      '403 Unauthorized và 401 Forbidden',
      '400 Bad Request và 409 Conflict'
    ],
    correct: 1,
    explanation: '401 Unauthorized nghĩa là bạn chưa chứng minh bạn là ai (thiếu hoặc sai token/password). 403 Forbidden nghĩa là server biết bạn là ai nhưng tài khoản của bạn không đủ quyền (ví dụ member cố truy cập trang Admin).'
  },
  {
    id: 503,
    topic: 'backend',
    topicName: 'Backend',
    level: 'intermediate',
    question: 'Vấn đề N+1 Query trong ORM (Prisma, Hibernate, Entity Framework) là gì và gây ảnh hưởng gì?',
    options: [
      'Gây tràn bộ nhớ vì lưu quá nhiều biến trong 1 hàm',
      'Thay vì dùng 1 câu lệnh JOIN để lấy dữ liệu liên kết, ORM thực hiện 1 câu query lấy danh sách cha rồi chạy thêm N câu query phụ để lấy dữ liệu con, gây thắt cổ chai hiệu năng database',
      'Lỗi khi database có hơn 1 triệu bản ghi',
      'Lỗi trùng lặp khóa chính Primary Key'
    ],
    correct: 1,
    explanation: 'Ví dụ lấy 100 tác giả kèm sách: Nếu bị N+1, server chạy 1 query lấy 100 tác giả, sau đó chạy thêm 100 queries lấy sách của từng tác giả -> 101 round-trips mạng. Giải pháp là dùng Eager Loading / JOIN / Dataloader.'
  },
  {
    id: 504,
    topic: 'backend',
    topicName: 'Backend',
    level: 'advanced',
    question: 'Trong kiến trúc Caching, chiến lược "Cache-Aside" (Lazy Loading) hoạt động như thế nào?',
    options: [
      'Ứng dụng luôn ghi thẳng vào Database và Cache đồng thời trong 1 transaction',
      'Ứng dụng kiểm tra Cache trước: nếu trúng (Cache Hit) thì trả về; nếu trượt (Cache Miss) thì đọc từ Database, nạp ngược lại vào Cache rồi mới trả về cho client',
      'Database tự động cập nhật Cache định kỳ mỗi 5 phút',
      'Cache chỉ lưu trữ các file tĩnh như hình ảnh và video'
    ],
    correct: 1,
    explanation: 'Cache-Aside là mô hình phổ biến nhất: Ứng dụng quản lý việc đọc ghi cache. Dữ liệu chỉ được nạp vào cache khi thực sự có người đọc (lazy), giúp cache không bị chứa đầy dữ liệu thừa thãi không ai cần.'
  },
  {
    id: 505,
    topic: 'backend',
    topicName: 'Backend',
    level: 'advanced',
    question: 'Theo định lý CAP trong hệ thống phân tán, khi xảy ra Network Partition (phân vùng mạng bị gián đoạn), hệ thống bắt buộc phải chọn đánh đổi giữa hai yếu tố nào?',
    options: [
      'Chi phí (Cost) và Hiệu năng (Performance)',
      'Tính nhất quán (Consistency) và Tính sẵn sàng (Availability)',
      'Bảo mật (Security) và Tính mở rộng (Scalability)',
      'Thời gian phản hồi (Latency) và Băng thông (Bandwidth)'
    ],
    correct: 1,
    explanation: 'Định lý CAP chỉ ra rằng một hệ thống phân tán không thể đồng thời đạt được cả Consistency (Nhất quán), Availability (Sẵn sàng) và Partition Tolerance (Chịu phân vùng). Vì Partition lỗi mạng là điều tất yếu xảy ra trên thực tế, hệ thống phải chọn giữa CP (giữ nhất quán nhưng từ chối request) hoặc AP (tiếp tục trả lời nhưng dữ liệu có thể cũ).'
  },
  {
    id: 506,
    topic: 'backend',
    topicName: 'Backend',
    level: 'intermediate',
    question: 'Cấu trúc của một chuỗi JSON Web Token (JWT) gồm có 3 phần được phân tách bằng dấu chấm (.) theo thứ tự nào?',
    options: [
      'Username . Password . Role',
      'Header . Payload . Signature',
      'ClientID . SecretKey . Timestamp',
      'Metadata . Data . Hash'
    ],
    correct: 1,
    explanation: 'JWT gồm 3 phần: Header (loại token và thuật toán băm), Payload (thông tin claims như userId, exp), và Signature (chữ ký số tạo từ Header + Payload + Secret Key để chống giả mạo).'
  },

  // ==========================================
  // JAVA & SPRING BOOT (12 câu)
  // ==========================================
  {
    id: 601,
    topic: 'java',
    topicName: 'Java',
    level: 'beginner',
    question: 'Trong Java, sự khác biệt giữa toán tử `==` và phương thức `.equals()` khi so sánh hai đối tượng String là gì?',
    codeSnippet: 'String s1 = new String("Java");\nString s2 = new String("Java");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));',
    options: [
      '`==` so sánh nội dung chuỗi; `.equals()` so sánh độ dài chuỗi',
      '`==` so sánh địa chỉ tham chiếu vùng nhớ (reference); `.equals()` so sánh giá trị nội dung thực tế bên trong chuỗi',
      'Cả hai đều so sánh giá trị và cho ra kết quả true true',
      'Java không cho phép so sánh String bằng dấu `==`'
    ],
    correct: 1,
    explanation: 'Vì `new String` tạo hai đối tượng riêng biệt trên Heap, `s1 == s2` kiểm tra địa chỉ vùng nhớ sẽ trả về false. Phương thức `s1.equals(s2)` đã được override trong class String để so sánh từng ký tự nên trả về true.'
  },
  {
    id: 602,
    topic: 'java',
    topicName: 'Java',
    level: 'intermediate',
    question: 'Tại sao trong Java kiểu dữ liệu `String` lại được thiết kế là Bất biến (Immutable)?',
    options: [
      'Để hạn chế kích thước RAM tối đa',
      'Cho phép String Pool hoạt động tiết kiệm bộ nhớ, đảm bảo an toàn đa luồng (Thread-safety) và an toàn bảo mật khi dùng làm key Hash/kết nối DB',
      'Để buộc lập trình viên phải chuyển sang dùng StringBuilder',
      'Do lỗi thiết kế thời Java 1.0 không sửa được'
    ],
    correct: 1,
    explanation: 'Tính bất biến giúp: (1) String Pool tái sử dụng chuỗi tiết kiệm heap, (2) Không lo bị luồng khác sửa đổi dữ liệu (thread-safe), (3) Giá trị hashCode được cache không đổi, an toàn làm key trong HashMap/HashSet.'
  },
  {
    id: 603,
    topic: 'java',
    topicName: 'Java',
    level: 'intermediate',
    question: 'Trong Java, Checked Exception khác Unchecked Exception ở điểm cơ bản nào?',
    options: [
      'Checked Exception kế thừa từ `RuntimeException`; Unchecked Exception kế thừa từ `Error`',
      'Checked Exception được kiểm tra lúc biên dịch (compile-time) và bắt buộc phải xử lý bằng `try-catch` hoặc khai báo `throws`; Unchecked Exception kế thừa từ `RuntimeException` và không bắt buộc',
      'Checked Exception chỉ xảy ra trên môi trường Production',
      'Checked Exception làm sập JVM ngay lập tức'
    ],
    correct: 1,
    explanation: 'Checked Exception (như `IOException`, `SQLException`) bắt buộc dev phải lường trước và xử lý ngay lúc code. Unchecked Exception (như `NullPointerException`, `ArrayIndexOutOfBoundsException`) xảy ra lúc runtime do lỗi logic lập trình.'
  },
  {
    id: 604,
    topic: 'java',
    topicName: 'Java',
    level: 'intermediate',
    question: 'Trong Spring Boot, tại sao Dependency Injection qua Constructor (Constructor Injection) lại được khuyến nghị hơn dùng `@Autowired` trực tiếp trên Field (Field Injection)?',
    options: [
      'Vì Constructor Injection chạy nhanh gấp 10 lần',
      'Giúp các dependency có thể khai báo `final` (bất biến), dễ viết Unit Test với Mockito mà không cần khởi động Spring Container, và phát hiện lỗi Circular Dependency sớm lúc khởi động',
      'Vì Spring Boot 3 đã xóa bỏ hoàn toàn annotation @Autowired',
      'Để tránh phải tạo getter setter'
    ],
    correct: 1,
    explanation: 'Field injection làm class bị dính chặt vào Spring container, khó test độc lập. Constructor injection cho phép khởi tạo object bằng tay khi viết test, đảm bảo dependency không bị null (`final`), an toàn và tường minh.'
  },
  {
    id: 605,
    topic: 'java',
    topicName: 'Java',
    level: 'advanced',
    question: 'Cấu trúc `ConcurrentHashMap` trong Java đạt được tính an toàn đa luồng (Thread-safe) với hiệu năng cao hơn `Hashtable` nhờ cơ chế nào?',
    options: [
      'Khóa toàn bộ bảng hash (table-level lock) mỗi khi đọc ghi',
      'Sử dụng kỹ thuật phân đoạn khóa (Lock Striping) và CAS (Compare-And-Swap) kết hợp synchronized trên từng Node/Bucket riêng lẻ thay vì khóa toàn bộ bảng',
      'Tự động nhân bản bảng hash cho từng luồng riêng biệt',
      'Lưu trữ dữ liệu ra ổ cứng SSD thay vì RAM'
    ],
    correct: 1,
    explanation: 'Hashtable hoặc Collections.synchronizedMap khóa cả bảng -> các thread khác phải xếp hàng chờ dù thao tác ở các key khác nhau. ConcurrentHashMap chỉ khóa trên từng bucket (hoặc dùng CAS không cần khóa khi đọc), cho phép nhiều thread đọc/ghi song song cùng lúc.'
  },

  // ==========================================
  // .NET & C# (12 câu)
  // ==========================================
  {
    id: 701,
    topic: 'dotnet',
    topicName: '.NET (C#)',
    level: 'beginner',
    question: 'Trong C#, sự khác biệt cốt lõi giữa Value Type (kiểu giá trị) và Reference Type (kiểu tham chiếu) là gì?',
    options: [
      'Value type kế thừa từ System.ValueType và thường được phân bổ trên Stack; Reference type kế thừa từ System.Object và được phân bổ trên Managed Heap',
      'Value type chỉ dùng cho số âm, Reference type dùng cho số dương',
      'Value type có thể gán giá trị null theo mặc định trong C# cũ',
      'Value type chạy chậm hơn Reference type'
    ],
    correct: 0,
    explanation: 'Value types (int, float, bool, struct) chứa trực tiếp giá trị và thường nằm trên Stack (hoặc inline trong heap object). Reference types (class, string, object, array) lưu địa chỉ con trỏ trên stack trỏ tới vùng nhớ thực trên Managed Heap do Garbage Collector quản lý.'
  },
  {
    id: 702,
    topic: 'dotnet',
    topicName: '.NET (C#)',
    level: 'intermediate',
    question: 'Trong ASP.NET Core Dependency Injection, vòng đời `Scoped` (AddScoped) có hành vi như thế nào?',
    options: [
      'Một instance duy nhất được tạo ra cho toàn bộ ứng dụng và tồn tại suốt vòng đời app',
      'Một instance mới được tạo ra mỗi khi có yêu cầu inject (mỗi lần resolve)',
      'Một instance được tạo ra cho mỗi HTTP Request và được tái sử dụng trong suốt quá trình xử lý request đó, sau đó được hủy',
      'Instance chỉ tồn tại trong vòng 10 giây'
    ],
    correct: 2,
    explanation: '3 Service Lifetimes cốt lõi trong .NET: (1) Transient: tạo mới mỗi lần gọi, (2) Scoped: tạo một lần cho mỗi HTTP request (rất chuẩn cho DbContext), (3) Singleton: tạo 1 lần dùng mãi mãi cho toàn ứng dụng.'
  },
  {
    id: 703,
    topic: 'dotnet',
    topicName: '.NET (C#)',
    level: 'intermediate',
    question: 'Khi truy vấn Entity Framework Core, phương thức `.AsNoTracking()` mang lại lợi ích gì?',
    codeSnippet: 'var users = await _context.Users.AsNoTracking().ToListAsync();',
    options: [
      'Tự động mã hóa mật khẩu của User trước khi trả về',
      'Tắt cơ chế Change Tracker của EF Core, giúp tăng đáng kể tốc độ truy vấn và tiết kiệm bộ nhớ khi chỉ đọc dữ liệu (Read-only)',
      'Xóa vĩnh viễn các bản ghi user khỏi database',
      'Bắt buộc database phải khóa dòng (Lock row)'
    ],
    correct: 1,
    explanation: 'Mặc định EF Core theo dõi mọi entity trong bộ nhớ để chuẩn bị cho `SaveChanges()`. Với truy vấn chỉ để đọc hiển thị (read-only), `.AsNoTracking()` bỏ qua quá trình snapshot tracking, giúp truy vấn nhanh hơn và nhẹ RAM hơn nhiều.'
  },
  {
    id: 704,
    topic: 'dotnet',
    topicName: '.NET (C#)',
    level: 'intermediate',
    question: 'Sự khác biệt thực thi giữa `IEnumerable<T>` và `IQueryable<T>` trong C# khi làm việc với Database là gì?',
    options: [
      '`IEnumerable` dịch câu lệnh thành SQL chạy trên database server; `IQueryable` tải hết về RAM máy client',
      '`IQueryable` giữ biểu thức Expression Tree và dịch thành câu lệnh SQL tối ưu chạy trực tiếp trên Database server; còn `IEnumerable` lọc dữ liệu trong bộ nhớ RAM sau khi đã tải về',
      '`IEnumerable` chỉ dùng cho mảng 1 chiều',
      'Cả hai đều giống hệt nhau về hiệu năng'
    ],
    correct: 1,
    explanation: 'Nếu viết `.Where(x => x.Age > 20)`: Trên `IQueryable`, điều kiện `WHERE Age > 20` được gửi sang SQL server (chỉ trả về 5 dòng). Trên `IEnumerable`, toàn bộ bảng 1 triệu dòng bị kéo về RAM client rồi C# mới lọc ra 5 dòng.'
  },
  {
    id: 705,
    topic: 'dotnet',
    topicName: '.NET (C#)',
    level: 'advanced',
    question: 'Từ khóa `record` trong C# 9+ mang lại ưu điểm nổi bật nào so với `class` truyền thống?',
    options: [
      'Cho phép chạy không cần .NET Runtime',
      'Hỗ trợ so sánh bằng dựa trên giá trị dữ liệu (Value-based equality), tính bất biến tự nhiên (init-only properties) và cú pháp sao chép dữ liệu gọn gàng với biểu thức `with`',
      'Không thể khai báo phương thức bên trong record',
      'Tự động lưu dữ liệu vào Redis cache'
    ],
    correct: 1,
    explanation: 'Hai record khác địa chỉ ô nhớ nhưng cùng giá trị các trường sẽ được coi là bằng nhau (`==` trả về true). Record rất lý tưởng để tạo DTOs, Value Objects và message contracts trong hệ thống phân tán.'
  },

  // ==========================================
  // DOCKER & CONTAINERIZATION (12 câu)
  // ==========================================
  {
    id: 801,
    topic: 'docker',
    topicName: 'Docker',
    level: 'beginner',
    question: 'Mối quan hệ giữa Docker Image và Docker Container là gì?',
    options: [
      'Container là bản thiết kế đóng băng; Image là thể hiện đang chạy',
      'Image là khuôn mẫu chỉ đọc (Read-only template); Container là một phiên bản thực thi (instance) đang chạy được tạo ra từ Image kèm theo một lớp ghi mỏng (Read-Write layer)',
      'Image chỉ chạy trên máy Linux; Container chỉ chạy trên Windows',
      'Không có sự khác biệt, hai từ này đồng nghĩa'
    ],
    correct: 1,
    explanation: 'Tương tự OOP: Image như Class (chỉ đọc, đóng gói mã nguồn và runtime), Container như Object (thể hiện đang chạy từ class đó, có state và tài nguyên riêng).'
  },
  {
    id: 802,
    topic: 'docker',
    topicName: 'Docker',
    level: 'intermediate',
    question: 'Trong các chỉ thị Dockerfile dưới đây, chỉ thị nào THỰC SỰ tạo ra một layer lưu trữ mới trong image?',
    options: ['EXPOSE', 'RUN', 'WORKDIR', 'ENV'],
    correct: 1,
    explanation: 'Chỉ các chỉ thị `RUN`, `COPY`, `ADD` mới ghi thêm dữ liệu tệp tin vào image và tạo layer mới. Các chỉ thị như `ENV`, `EXPOSE`, `WORKDIR`, `CMD`, `LABEL` chỉ thêm thông tin cấu hình metadata không tạo dữ liệu layer.'
  },
  {
    id: 803,
    topic: 'docker',
    topicName: 'Docker',
    level: 'intermediate',
    question: 'Kỹ thuật Multi-stage Builds trong Dockerfile giải quyết bài toán lớn nào?',
    codeSnippet: 'FROM golang:1.22 AS builder\nRUN go build -o myapp\n\nFROM alpine:latest\nCOPY --from=builder /myapp /myapp\nCMD ["/myapp"]',
    options: [
      'Cho phép chạy container trên nhiều đám mây khác nhau',
      'Tách riêng môi trường build (nhiều công cụ nặng) và môi trường production, giúp giảm tối đa kích thước image cuối và loại bỏ mã nguồn khỏi image xuất xưởng',
      'Tự động cân bằng tải giữa các container',
      'Chạy cùng lúc hai hệ điều hành Windows và Linux'
    ],
    correct: 1,
    explanation: 'Stage 1 chứa đầy đủ Go SDK/Node/Maven nặng hàng GB để build code ra binary. Stage 2 chỉ lấy đúng file binary đó copy sang một image siêu nhẹ (như Alpine chỉ 5MB), giúp image production cực nhỏ gọn, bảo mật cao.'
  },
  {
    id: 804,
    topic: 'docker',
    topicName: 'Docker',
    level: 'intermediate',
    question: 'Sự khác biệt cốt lõi giữa `ENTRYPOINT` và `CMD` trong Dockerfile là gì?',
    options: [
      '`ENTRYPOINT` xác định câu lệnh thực thi chính không thể bị ghi đè ngẫu nhiên; `CMD` cung cấp các đối số mặc định có thể dễ dàng bị ghi đè khi chạy `docker run`',
      '`CMD` bắt buộc phải là file script Bash, `ENTRYPOINT` là file nhị phân',
      '`ENTRYPOINT` chỉ chạy khi tắt container',
      '`CMD` chạy trước khi image được build xong'
    ],
    correct: 0,
    explanation: 'Khi kết hợp: `ENTRYPOINT ["nginx"]` và `CMD ["-g", "daemon off;"]`. Lệnh thực tế chạy là `nginx -g "daemon off;"`. Nếu gõ `docker run my-image -v`, tham số `-v` sẽ ghi đè CMD thành `nginx -v`.'
  },
  {
    id: 805,
    topic: 'docker',
    topicName: 'Docker',
    level: 'advanced',
    question: 'Tại sao nên sử dụng Docker Volume (Named Volume) thay vì Bind Mount để lưu trữ dữ liệu Database trong Production?',
    options: [
      'Vì Volume tự động mã hóa dữ liệu bằng blockchain',
      'Volume được quản lý hoàn toàn bởi Docker daemon, độc lập với cấu trúc thư mục của host, có hiệu năng I/O tốt hơn trên Windows/Mac và dễ dàng backup/di chuyển',
      'Bind mount không lưu được dữ liệu dạng text',
      'Volume không bao giờ bị đầy ổ cứng'
    ],
    correct: 1,
    explanation: 'Named Volume được Docker lưu tại vùng an toàn riêng (`/var/lib/docker/volumes`), không phụ thuộc vào đường dẫn tuyệt đối của máy host, tránh xung đột quyền ghi (permission) và không bị ảnh hưởng bởi file hệ thống của máy phát triển.'
  }
,
  {
    "id": 111,
    "topic": "html",
    "topicName": "HTML",
    "level": "intermediate",
    "question": "Khi sử dụng thẻ <img>, thuộc tính nào sau đây cho phép trình duyệt tự chọn ảnh phù hợp theo độ phân giải màn hình hoặc kích thước khung nhìn?",
    "options": [
      "alt và title",
      "srcset và sizes",
      "crossorigin và loading",
      "width và height"
    ],
    "correct": 1,
    "explanation": "`srcset` cung cấp danh sách URL ảnh kèm mật độ điểm ảnh (1x, 2x) hoặc chiều rộng thật (e.g. 800w, 1200w). `sizes` chỉ rõ ảnh sẽ chiếm bao nhiêu phần trăm màn hình ở từng breakpoint để browser tải phiên bản tối ưu nhất."
  },
  {
    "id": 112,
    "topic": "html",
    "topicName": "HTML",
    "level": "intermediate",
    "question": "Thuộc tính loading=\"lazy\" trên thẻ <img> và <iframe> có tác dụng gì?",
    "options": [
      "Làm mờ ảnh khi đang tải",
      "Trì hoãn việc tải ảnh/iframe cho đến khi người dùng cuộn trang tới gần vị trí đó trong viewport (Native Lazy Loading)",
      "Giảm chất lượng ảnh để tăng tốc độ tải",
      "Tự động convert ảnh sang định dạng WebP"
    ],
    "correct": 1,
    "explanation": "Native Lazy Loading được trình duyệt hỗ trợ trực tiếp từ HTML5 mà không cần viết mã JavaScript kiểm tra IntersectionObserver, tiết kiệm băng thông đáng kể cho các trang dài."
  },
  {
    "id": 113,
    "topic": "html",
    "topicName": "HTML",
    "level": "intermediate",
    "question": "Trong form HTML5, thuộc tính nào bắt buộc người dùng phải nhập theo một định dạng Regex cụ thể trước khi submit?",
    "options": [
      "required",
      "pattern",
      "autocomplete",
      "type=\"regex\""
    ],
    "correct": 1,
    "explanation": "Thuộc tính pattern=\"[0-9]{10}\" nhận một Regular Expression và tự động kích hoạt Constraint Validation API của trình duyệt khi submit form."
  },
  {
    "id": 209,
    "topic": "css",
    "topicName": "CSS",
    "level": "intermediate",
    "question": "Pseudo-class :has() trong Modern CSS thường được ví như tính năng gì mà trước đây CSS không thể làm được?",
    "options": [
      "Parent selector (Bộ chọn phần tử cha dựa trên trạng thái của phần tử con)",
      "Bộ chọn phần tử anh em trước nó",
      "Bộ chọn ngẫu nhiên một phần tử con",
      "Tính năng thay thế hoàn toàn cho JavaScript"
    ],
    "correct": 0,
    "explanation": "Ví dụ: article:has(img) sẽ chọn thẻ article nếu bên trong nó có chứa thẻ img. Trước khi có :has(), CSS chỉ có thể chọn từ cha xuống con, không thể chọn cha dựa vào con."
  },
  {
    "id": 210,
    "topic": "css",
    "topicName": "CSS",
    "level": "intermediate",
    "question": "Điều kiện nào sau đây có thể khiến position: sticky KHÔNG hoạt động như mong đợi?",
    "options": [
      "Phần tử có đặt thuộc tính top hoặc bottom",
      "Phần tử cha hoặc tổ tiên có thuộc tính overflow: hidden, overflow: auto hoặc overflow: scroll",
      "Phần tử có display: block",
      "Phần tử chứa văn bản tiếng Việt"
    ],
    "correct": 1,
    "explanation": "Nếu một phần tử cha hoặc bất kỳ tổ tiên nào có overflow khác visible, phạm vi cuộn của sticky sẽ bị giới hạn trong khung chứa của cha đó thay vì cuộn theo toàn trang."
  },
  {
    "id": 211,
    "topic": "css",
    "topicName": "CSS",
    "level": "advanced",
    "question": "Quy tắc @layer (Cascade Layers) trong CSS ra đời nhằm giải quyết vấn đề lớn nào?",
    "options": [
      "Cho phép vẽ đồ họa 3D",
      "Kiểm soát thứ tự ưu tiên của các tầng CSS (như reset, framework, component, utility) một cách tường minh mà không cần phải phụ thuộc vào Specificity hacks hay !important",
      "Nén file CSS lại trước khi gửi qua mạng",
      "Tự động dịch mã Sass thành CSS"
    ],
    "correct": 1,
    "explanation": "Với @layer reset, framework, components, utilities;, các quy tắc trong layer khai báo sau sẽ luôn ghi đè layer trước bất kể độ phức tạp của selector (specificity)."
  },
  {
    "id": 308,
    "topic": "javascript",
    "topicName": "JavaScript",
    "level": "intermediate",
    "question": "Hàm nào sau đây trong JavaScript hiện đại thực hiện Deep Clone (sao chép sâu) một object chuẩn xác nhất mà không làm mất kiểu Date hay RegExp?",
    "options": [
      "Object.assign({}, obj)",
      "JSON.parse(JSON.stringify(obj))",
      "structuredClone(obj)",
      "{ ...obj }"
    ],
    "correct": 2,
    "explanation": "`structuredClone()` là hàm built-in mới trong Web API & Node.js 17+. Nó giải quyết triệt để vấn đề circular references, hỗ trợ Date, RegExp, Map, Set, TypedArray mà không bị biến Date thành string như JSON.parse."
  },
  {
    "id": 309,
    "topic": "javascript",
    "topicName": "JavaScript",
    "level": "intermediate",
    "question": "Biểu thức so sánh nào sau đây trả về true trong JavaScript do cơ chế Type Coercion?",
    "options": [
      "[] == false",
      "null === undefined",
      "\"false\" == false",
      "NaN == NaN"
    ],
    "correct": 0,
    "explanation": "Toán tử == ép kiểu mảng rỗng [] thành chuỗi rỗng \"\", chuỗi rỗng ép thành số 0. Boolean false ép thành số 0. Vì 0 == 0 nên [] == false trả về true. Trong khi đó \"false\" == false trả về false (NaN == 0)."
  },
  {
    "id": 310,
    "topic": "javascript",
    "topicName": "JavaScript",
    "level": "advanced",
    "question": "Trong JavaScript Event Handling, phương thức e.stopPropagation() khác gì so với e.preventDefault()?",
    "options": [
      "stopPropagation() ngăn hành vi mặc định của trình duyệt; preventDefault() ngăn sự kiện lan truyền",
      "stopPropagation() ngăn không cho sự kiện nổi bọt (bubbling) lên các phần tử cha; preventDefault() ngăn hành vi mặc định của trình duyệt (như bấm thẻ <a> đổi trang hay submit form reload trang)",
      "Cả hai phương thức hoàn toàn giống nhau",
      "stopPropagation() chỉ dùng được cho phím bấm"
    ],
    "correct": 1,
    "explanation": "`e.preventDefault()` ngăn hành động tự nhiên của thẻ (submit form, follow link). `e.stopPropagation()` chặn không cho sự kiện lan truyền tiếp dọc theo cây DOM (bubbling/capturing phase)."
  },
  {
    "id": 407,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Trong React 18, cơ chế Automatic Batching có sự thay đổi đột phá nào so với React 17?",
    "options": [
      "React 18 không còn hỗ trợ batching",
      "React 18 tự động gộp (batch) nhiều lần gọi setState thành 1 lần re-render duy nhất cho MỌI trường hợp (bao gồm cả bên trong setTimeout, Promise.then, Fetch callback hay native event listeners)",
      "React 18 chỉ batching trong hàm onClick",
      "Mỗi lần gọi setState trong React 18 đều re-render ngay lập tức"
    ],
    "correct": 1,
    "explanation": "Ở React 17 trở về trước, chỉ các event handler của React mới được batching; nếu gọi setState trong setTimeout hay async await thì mỗi setState lại gây ra 1 lần render riêng. React 18 gom tất cả lại giúp tối ưu hiệu năng vượt bậc."
  },
  {
    "id": 408,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Khi nào giá trị của useRef thay đổi có làm component re-render không?",
    "options": [
      "Có, luôn kích hoạt re-render ngay lập tức giống useState",
      "KHÔNG bao giờ gây ra re-render khi thuộc tính .current thay đổi giá trị",
      "Chỉ re-render nếu lưu trữ số",
      "Chỉ re-render trong môi trường Production"
    ],
    "correct": 1,
    "explanation": "`useRef` trả về một plain JavaScript object với thuộc tính .current có thể biến đổi (mutable). Thay đổi .current không làm kích hoạt chu kỳ render mới, rất lý tưởng để giữ tham chiếu DOM node hoặc biến cờ hiệu (flag/timerId)."
  },
  {
    "id": 409,
    "topic": "react",
    "topicName": "React",
    "level": "advanced",
    "question": "Hook useTransition trong React 18 được sử dụng cho mục đích nào?",
    "options": [
      "Tạo hiệu ứng CSS transition chuyển màu mượt mà",
      "Đánh dấu một cập nhật state là \"Độ ưu tiên không khẩn cấp\" (non-urgent transition), cho phép React tạm hoãn hoặc ngắt quãng tác vụ render nặng để ưu tiên phản hồi tức thì cho tương tác gõ phím/click của người dùng",
      "Chuyển đổi dữ liệu từ string sang number",
      "Điều hướng trang trong React Router"
    ],
    "correct": 1,
    "explanation": "Ví dụ ô tìm kiếm với danh sách 10.000 sản phẩm: Gõ chữ vào ô input là việc khẩn cấp (urgent), render danh sách kết quả là không khẩn cấp (startTransition). Nhờ đó giao diện không bị giật lag (freeze)."
  },
  {
    "id": 901,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "beginner",
    "question": "Node.js chạy trên kiến trúc nào sau đây?",
    "options": [
      "Multi-threaded blocking I/O với Apache server",
      "Single-threaded event loop với Non-blocking I/O do thư viện libuv điều phối",
      "Chỉ chạy được trên môi trường đa vi xử lý (Multi-core) song song đồng bộ",
      "Chạy trực tiếp trên máy ảo Java Virtual Machine"
    ],
    "correct": 1,
    "explanation": "Node.js sử dụng JavaScript V8 Engine của Google kết hợp với thư viện C libuv để cung cấp Event-driven, non-blocking I/O model chạy trên 1 luồng chính (Main Thread), giúp phục vụ hàng vạn kết nối đồng thời với lượng RAM rất nhỏ."
  },
  {
    "id": 902,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Trong Node.js, process.nextTick() khác gì so với setImmediate()?",
    "options": [
      "setImmediate() chạy trước process.nextTick()",
      "process.nextTick() được kích hoạt ngay lập tức sau khi giai đoạn hiện tại kết thúc, trước khi Event Loop chuyển sang pha tiếp theo; còn setImmediate() được xếp vào pha Check phase của Event Loop",
      "process.nextTick() chỉ dùng trong môi trường test",
      "Hai hàm này hoàn toàn giống nhau về thứ tự ưu tiên"
    ],
    "correct": 1,
    "explanation": "Mặc dù có tên là \"next tick\", process.nextTick() không phải là một phần của libuv event loop mà nó chạy ngay tại thời điểm ranh giới giữa các phase. Gọi đệ quy process.nextTick() có thể làm đói (starve) I/O của toàn bộ ứng dụng."
  },
  {
    "id": 903,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Tại sao khi xử lý file dung lượng lớn (hàng trăm MB hoặc GB) trong Node.js, ta nên dùng fs.createReadStream() thay vì fs.readFile()?",
    "options": [
      "Vì fs.readFile() không đọc được file tiếng Việt",
      "fs.readFile() tải toàn bộ nội dung file vào bộ nhớ RAM cùng một lúc dễ gây out of memory; Stream đọc dữ liệu thành từng mảng nhỏ (chunks) theo luồng giúp bộ nhớ RAM luôn ổn định ở mức vài MB",
      "Stream tự động giải nén file zip",
      "Stream tự động mã hóa dữ liệu bảo mật"
    ],
    "correct": 1,
    "explanation": "Stream đọc tuần tự từng chunk và có cơ chế Backpressure để tránh tràn RAM khi bên đọc xử lý chậm hơn bên gửi. fs.readFile nạp trọn vẹn cả file vào buffer nên 1 file 2GB sẽ ngốn 2GB RAM."
  },
  {
    "id": 951,
    "topic": "database",
    "topicName": "Database",
    "level": "intermediate",
    "question": "Cấu trúc dữ liệu phổ biến nhất được sử dụng cho Index (chỉ mục) trong các hệ quản trị cơ sở dữ liệu quan hệ (PostgreSQL, MySQL InnoDB) là gì?",
    "options": [
      "Linked List",
      "B-Tree / B+Tree",
      "Stack",
      "Graph"
    ],
    "correct": 1,
    "explanation": "B+Tree lưu tất cả dữ liệu thực tế tại các nút lá (leaf nodes) và các lá được liên kết kép với nhau. Cấu trúc này tối ưu tuyệt vời cho cả việc tìm kiếm chính xác (O(log N)) lẫn tìm kiếm theo dải (Range scan e.g. BETWEEN, >, <)."
  },
  {
    "id": 952,
    "topic": "database",
    "topicName": "Database",
    "level": "intermediate",
    "question": "Hiện tượng \"Dirty Read\" (Đọc bẩn) trong Transaction cơ sở dữ liệu là gì?",
    "options": [
      "Đọc phải dữ liệu đã bị xóa vĩnh viễn khỏi ổ cứng",
      "Một transaction đọc được dữ liệu chưa được commit của một transaction khác đang chạy song song, sau đó transaction đó bị rollback",
      "Đọc dữ liệu có chứa mã độc XSS",
      "Đọc dữ liệu từ file backup cũ"
    ],
    "correct": 1,
    "explanation": "Nếu Transaction A sửa số dư từ 100 thành 200 (chưa commit). Transaction B đọc thấy 200. Sau đó Transaction A bị lỗi và Rollback về 100. Khi đó Transaction B đã dùng dữ liệu ảo không có thật (Dirty Data)."
  },
  {
    "id": 953,
    "topic": "database",
    "topicName": "Database",
    "level": "advanced",
    "question": "Sự khác biệt giữa INNER JOIN và LEFT JOIN trong SQL là gì?",
    "options": [
      "INNER JOIN chỉ trả về các dòng thỏa mãn điều kiện khớp ở CẢ HAI bảng; LEFT JOIN trả về TẤT CẢ các dòng từ bảng bên trái kèm các giá trị khớp từ bảng phải (nếu không khớp thì điền NULL)",
      "INNER JOIN chạy chậm hơn LEFT JOIN gấp 10 lần",
      "LEFT JOIN chỉ dùng được trên bảng có khóa chính",
      "INNER JOIN tự động xóa các dòng trùng lặp"
    ],
    "correct": 0,
    "explanation": "INNER JOIN là phần giao (intersection) giữa 2 bảng. LEFT JOIN giữ nguyên 100% dữ liệu bảng trái, nếu bản ghi bảng trái không có quan hệ tương ứng ở bảng phải thì các cột của bảng phải sẽ mang giá trị NULL."
  },
  {
    "id": 606,
    "topic": "java",
    "topicName": "Java",
    "level": "intermediate",
    "question": "Trong Java 8+, phương thức map() khác flatMap() trong Stream API ở điểm nào?",
    "options": [
      "map() biến đổi từng phần tử thành một giá trị mới; flatMap() biến đổi từng phần tử thành một Stream rồi san phẳng (flatten) tất cả các Stream đó thành một Stream duy nhất",
      "flatMap() chỉ dùng cho số thực",
      "map() chạy song song, flatMap() chạy tuần tự",
      "flatMap() tự động lọc bỏ các giá trị null"
    ],
    "correct": 0,
    "explanation": "map(x -> x.getOrders()) trả về Stream<List<Order>> (dòng chứa các danh sách lồng nhau). flatMap(x -> x.getOrders().stream()) san phẳng cấu trúc thành một Stream<Order> duy nhất."
  },
  {
    "id": 607,
    "topic": "java",
    "topicName": "Java",
    "level": "advanced",
    "question": "Bộ nhớ JVM (Java Virtual Machine) được phân chia thành hai vùng chính nào cho việc lưu trữ dữ liệu thời gian thực?",
    "options": [
      "ROM và Cache",
      "Stack (lưu trữ các biến nguyên thủy cục bộ và khung gọi hàm theo luồng) và Heap (lưu trữ tất cả các đối tượng/instances được cấp phát động và được Garbage Collector dọn dẹp)",
      "Direct Memory và Virtual Memory",
      "Primary Buffer và Secondary Storage"
    ],
    "correct": 1,
    "explanation": "Stack Memory được cấp phát riêng cho từng thread, tốc độ truy cập cực nhanh, tự giải phóng khi ra khỏi scope hàm. Heap Memory dùng chung cho toàn bộ ứng dụng, nơi chứa mọi new Object()."
  },
  {
    "id": 706,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "intermediate",
    "question": "Khi cần nối hàng nghìn chuỗi ký tự trong một vòng lặp trong C#, tại sao nên dùng StringBuilder thay vì toán tử +?",
    "options": [
      "Vì toán tử + bị cấm trong vòng lặp",
      "Vì chuỗi string là bất biến, toán tử + sẽ tạo ra một đối tượng chuỗi mới trong heap ở mỗi vòng lặp gây áp lực lớn lên Garbage Collector; StringBuilder có bộ đệm nội tại có thể mở rộng mà không cấp phát lại",
      "StringBuilder tự động kiểm tra lỗi chính tả",
      "StringBuilder hỗ trợ lưu chuỗi vào cơ sở dữ liệu"
    ],
    "correct": 1,
    "explanation": "Nối chuỗi str += i 10.000 lần sẽ tạo ra 10.000 đối tượng rác trong Gen 0 của GC Heap, làm ứng dụng giật cục vì GC chạy liên tục. StringBuilder sử dụng mảng ký tự nội bộ, mở rộng theo cấp số nhân, hiệu năng vượt trội O(N)."
  },
  {
    "id": 707,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "advanced",
    "question": "Middleware Pipeline trong ASP.NET Core hoạt động theo cơ chế nào?",
    "options": [
      "Thực thi ngẫu nhiên không theo thứ tự",
      "Cơ chế Russian Doll (con búp bê Nga) hoặc hai chiều (Inbound & Outbound): request đi tuần tự qua từng middleware qua hàm next(), sau đó response lại đi ngược chiều trở lại ra ngoài",
      "Chỉ có tối đa 1 middleware được chạy cho mỗi request",
      "Middleware chạy trên luồng phụ nền (Background thread)"
    ],
    "correct": 1,
    "explanation": "Mỗi middleware có cơ hội thực thi code trước khi gọi await next() (chiều vào) và sau khi await next() hoàn tất (chiều ra). Thứ tự đăng ký middleware trong Program.cs cực kỳ quan trọng (e.g. Auth phải trước Endpoints)."
  },
  {
    "id": 806,
    "topic": "docker",
    "topicName": "Docker",
    "level": "intermediate",
    "question": "File .dockerignore có vai trò quan trọng nào trong quá trình build Docker image?",
    "options": [
      "Ngăn không cho container khởi động",
      "Loại trừ các thư mục nặng hoặc nhạy cảm (như node_modules, .git, .env) khỏi Build Context gửi lên Docker daemon, giúp tăng tốc độ build và tránh rò rỉ secret keys",
      "Tự động xóa các container cũ",
      "Chặn các kết nối mạng nguy hiểm"
    ],
    "correct": 1,
    "explanation": "Khi gõ docker build ., client phải gửi toàn bộ thư mục hiện tại (Build Context) sang Docker daemon. Nếu không có .dockerignore, hàng trăm MB của node_modules hoặc file .env chứa mật khẩu sẽ bị gửi sang và đóng gói vào image."
  },
  {
    "id": 807,
    "topic": "docker",
    "topicName": "Docker",
    "level": "advanced",
    "question": "Sự khác biệt cốt lõi giữa Máy Ảo (Virtual Machine - VM) và Container (Docker) là gì?",
    "options": [
      "VM chỉ chạy được Linux, Container chỉ chạy được Windows",
      "VM ảo hóa phần cứng và chạy một Hệ Điều Hành khách hoàn chỉnh (Guest OS) bên trên Hypervisor; Container chia sẻ trực tiếp Nhân Hệ Điều Hành của máy chủ (Host OS Kernel) và cô lập tài nguyên bằng cgroups & namespaces",
      "Container nặng hơn và khởi động chậm hơn VM",
      "VM không cần phần cứng CPU thực tế"
    ],
    "correct": 1,
    "explanation": "Nhờ dùng chung nhân Kernel của Host OS và cô lập bằng tính năng nhân Linux (namespaces tách biệt process, cgroups giới hạn RAM/CPU), Container khởi động trong vài mili-giây và tiêu tốn cực ít RAM so với việc phải nạp cả 1 Guest OS như VM."
  }
,
  {
    "id": 507,
    "topic": "frontend",
    "topicName": "Frontend",
    "level": "intermediate",
    "question": "Chỉ số Core Web Vitals nào đo lường độ phản hồi tương tác tổng thể của người dùng trên toàn bộ vòng đời trang (được Google chính thức thay thế cho FID từ năm 2024)?",
    "options": [
      "CLS (Cumulative Layout Shift)",
      "INP (Interaction to Next Paint)",
      "TTFB (Time to First Byte)",
      "FCP (First Contentful Paint)"
    ],
    "correct": 1,
    "explanation": "Từ tháng 3/2024, INP (Interaction to Next Paint) chính thức thay thế FID. INP đo độ trễ của tất cả các lần click, tap, gõ phím trong suốt phiên truy cập của user để đánh giá độ phản hồi thực tế của trang."
  },
  {
    "id": 508,
    "topic": "frontend",
    "topicName": "Frontend",
    "level": "intermediate",
    "question": "Critical Rendering Path của trình duyệt diễn ra theo trình tự chuẩn nào sau đây?",
    "options": [
      "Paint -> Layout -> Render Tree -> DOM & CSSOM",
      "DOM Tree & CSSOM Tree -> Render Tree -> Layout (Reflow) -> Paint (Repaint) -> Composite",
      "JavaScript -> Layout -> Paint -> CSSOM",
      "HTML -> Paint -> Layout -> DOM Tree"
    ],
    "correct": 1,
    "explanation": "Trình duyệt trước tiên parse HTML thành DOM và CSS thành CSSOM, sau đó kết hợp thành Render Tree (chỉ chứa các node hiển thị), tính toán vị trí kích thước (Layout/Reflow), vẽ pixel (Paint), và ghép các lớp lại với GPU (Composite)."
  },
  {
    "id": 509,
    "topic": "frontend",
    "topicName": "Frontend",
    "level": "intermediate",
    "question": "Khi gửi một Cross-Origin AJAX request với method PUT hoặc có header tùy chỉnh, tại sao trình duyệt lại tự động gửi một request OPTIONS trước đó?",
    "options": [
      "Để kiểm tra kết nối internet có bị đứt hay không",
      "Đó là Preflight Request trong cơ chế CORS, nhằm hỏi server xem origin, HTTP method và headers này có được phép thực thi không trước khi gửi request thật",
      "Để server tạo trước session cho client",
      "Do lỗi cấu hình DNS của trình duyệt"
    ],
    "correct": 1,
    "explanation": "Preflight OPTIONS request được browser tự động gửi khi request không phải là \"Simple Request\" (ví dụ dùng method PUT, DELETE, hoặc header Authorization). Nếu server trả về các header `Access-Control-Allow-*` hợp lệ, browser mới gửi request chính."
  },
  {
    "id": 510,
    "topic": "frontend",
    "topicName": "Frontend",
    "level": "advanced",
    "question": "Web Worker trong trình duyệt giải quyết bài toán lớn nào trong ứng dụng Frontend?",
    "options": [
      "Thay thế hoàn toàn cho Service Worker để lưu cache offline",
      "Cho phép chạy các thuật toán tính toán nặng trên một background thread riêng biệt mà không làm đơ hoặc giật lag giao diện (Main UI Thread)",
      "Tự động tăng tốc độ mạng 4G/5G",
      "Bỏ qua cơ chế Same-Origin Policy của trình duyệt"
    ],
    "correct": 1,
    "explanation": "JavaScript trên trình duyệt là single-threaded; nếu bạn xử lý mã hóa file, nén ảnh hay tính toán ma trận lớn trên Main Thread, UI sẽ bị treo (unresponsive). Web Worker chạy trên thread riêng và giao tiếp qua `postMessage()`."
  },
  {
    "id": 511,
    "topic": "frontend",
    "topicName": "Frontend",
    "level": "intermediate",
    "question": "Để ngăn chặn triệt để tấn công XSS (Cross-Site Scripting) từ việc hacker đánh cắp token xác thực, cách lưu trữ Access Token / Refresh Token an toàn nhất trên Client là gì?",
    "options": [
      "Lưu trực tiếp vào localStorage",
      "Lưu trực tiếp vào sessionStorage",
      "Lưu vào Cookie với các cờ `HttpOnly`, `Secure` và `SameSite=Strict/Lax` do server cấp phát",
      "Ghi thẳng vào URL query parameter"
    ],
    "correct": 2,
    "explanation": "Cookie có cờ `HttpOnly` hoàn toàn không thể bị truy cập hay đọc bởi bất kỳ mã JavaScript nào trên trang (kể cả khi trang bị dính mã độc XSS), `Secure` bảo đảm chỉ truyền qua HTTPS, và `SameSite` ngăn ngừa tấn công CSRF."
  },
  {
    "id": 512,
    "topic": "frontend",
    "topicName": "Frontend",
    "level": "intermediate",
    "question": "Kỹ thuật Code Splitting (Chia nhỏ mã nguồn) và Dynamic Import trong các bundler hiện đại (Webpack, Vite, Turbopack) mang lại lợi ích gì lớn nhất?",
    "options": [
      "Giúp code chạy trên trình duyệt IE6",
      "Giảm dung lượng Initial JS Bundle, chỉ tải các module/component khi người dùng thực sự cần đến (Lazy Load), giúp tăng tốc đáng kể thời gian tải trang ban đầu (FCP/LCP)",
      "Mã hóa toàn bộ source code thành binary bảo mật",
      "Tự động chuyển đổi mã CSS sang JavaScript"
    ],
    "correct": 1,
    "explanation": "Thay vì tải toàn bộ 5MB code của trang quản trị, dashboard, giỏ hàng ngay khi vừa vào trang chủ, Dynamic Import (`import('./Component')`) chia nhỏ thành các chunk và tải theo nhu cầu khi user click hoặc chuyển route."
  },
  {
    "id": 557,
    "topic": "backend",
    "topicName": "Backend",
    "level": "intermediate",
    "question": "Phương thức HTTP nào sau đây KHÔNG có tính chất Idempotent (Idempotency - tính lũy đẳng)?",
    "options": [
      "GET",
      "PUT",
      "DELETE",
      "POST"
    ],
    "correct": 3,
    "explanation": "Idempotent nghĩa là thực thi 1 lần hay N lần liên tiếp với cùng tham số đều cho ra cùng 1 kết quả trạng thái hệ thống. GET, PUT, DELETE là idempotent. POST tạo ra tài nguyên mới mỗi lần gọi nên KHÔNG idempotent."
  },
  {
    "id": 558,
    "topic": "backend",
    "topicName": "Backend",
    "level": "advanced",
    "question": "Trong kiến trúc Microservices, Pattern nào được sử dụng phổ biến nhất để quản lý các Distributed Transactions (Giao dịch phân tán trên nhiều service) thay cho giao thức 2-Phase Commit (2PC) nặng nề?",
    "options": [
      "Singleton Pattern",
      "Saga Pattern (với cơ chế Choreography hoặc Orchestration)",
      "Observer Pattern",
      "Decorator Pattern"
    ],
    "correct": 1,
    "explanation": "Saga Pattern chia giao dịch phân tán thành chuỗi các local transactions trên từng service. Nếu một bước thất bại, Saga sẽ kích hoạt các Compensating Transactions (giao dịch bù trừ) để rollback dữ liệu về trạng thái hợp lệ."
  },
  {
    "id": 559,
    "topic": "backend",
    "topicName": "Backend",
    "level": "intermediate",
    "question": "Tại sao giao thức gRPC thường cho tốc độ truyền tải nhanh hơn và tiêu tốn ít băng thông hơn đáng kể so với REST API truyền thống?",
    "options": [
      "Vì gRPC không cần kết nối mạng",
      "gRPC sử dụng HTTP/2 (ghép kênh multiplexing, nén header) và định dạng tuần tự hóa nhị phân Protocol Buffers (Protobuf) thay cho JSON dạng text cồng kềnh",
      "Vì gRPC chỉ hỗ trợ ngôn ngữ C++",
      "gRPC tự động xóa bớt các dữ liệu quan trọng"
    ],
    "correct": 1,
    "explanation": "Protobuf serialize dữ liệu thành chuỗi nhị phân siêu nhỏ và có cấu trúc schema chặt chẽ (.proto). Kết hợp HTTP/2 multiplexing cho phép stream hai chiều đồng thời, nhanh hơn REST JSON từ 5 đến 10 lần."
  },
  {
    "id": 560,
    "topic": "backend",
    "topicName": "Backend",
    "level": "intermediate",
    "question": "Mục đích chính của cơ chế Database Connection Pooling (như HikariCP trong Java hoặc pg-pool trong Node) là gì?",
    "options": [
      "Tự động tăng dung lượng ổ cứng cho Database",
      "Tái sử dụng các kết nối TCP/Database đã mở sẵn thay vì phải tốn tài nguyên và thời gian thực hiện 3-way handshake và xác thực mỗi khi có request tới",
      "Mã hóa toàn bộ bảng dữ liệu trong DB",
      "Chuyển đổi dữ liệu SQL thành NoSQL"
    ],
    "correct": 1,
    "explanation": "Tạo một connection mới đến DB tốn từ 20-100ms (TCP handshake, SSL, authentication, session init). Connection Pool duy trì sẵn 10-20 kết nối rảnh rỗi, cấp phát cho worker và thu hồi lại ngay, tăng throughput hàng chục lần."
  },
  {
    "id": 561,
    "topic": "backend",
    "topicName": "Backend",
    "level": "advanced",
    "question": "Thuật toán Rate Limiting nào sau đây cho phép hệ thống tiếp nhận một lượng burst requests đột biến nhất định nhưng vẫn đảm bảo tốc độ xả trung bình ổn định?",
    "options": [
      "Token Bucket Algorithm",
      "Round Robin",
      "Linear Regression",
      "Quick Sort"
    ],
    "correct": 0,
    "explanation": "Token Bucket chứa tối đa B tokens. Mỗi đơn vị thời gian hệ thống thêm R tokens vào thùng. Khi có request, nếu thùng còn token thì trừ 1 token và cho qua. Nhờ đó nó chịu được lưu lượng tăng vọt (burst) bằng đúng dung lượng thùng B."
  },
  {
    "id": 562,
    "topic": "backend",
    "topicName": "Backend",
    "level": "intermediate",
    "question": "Hiện tượng \"Cache Avalanche\" (Sập đổ bộ nhớ đệm) trong hệ thống Backend xảy ra khi nào và cách phòng tránh tốt nhất là gì?",
    "options": [
      "Do bộ nhớ RAM của Redis bị hỏng phần cứng",
      "Xảy ra khi một lượng lớn keys trong Cache cùng hết hạn (TTL) tại một thời điểm, khiến hàng triệu request đồng loạt ập thẳng vào Database gây quá tải; Cách phòng tránh là thêm thời gian ngẫu nhiên (Jitter/Random TTL) vào mỗi key",
      "Do người dùng bấm F5 liên tục",
      "Do server bị mất điện đột ngột"
    ],
    "correct": 1,
    "explanation": "Khi hàng loạt cache keys có TTL bằng đúng 30 phút, đến phút thứ 30 tất cả đều biến mất. Mọi request đổ dồn vào RDBMS làm sập DB. Giải pháp: Thêm ngẫu nhiên: `TTL = 1800 + Math.random() * 300` giây."
  },
  {
    "id": 608,
    "topic": "java",
    "topicName": "Java",
    "level": "intermediate",
    "question": "Từ khóa volatile trong Java có tác dụng quan trọng nào đối với các biến được truy cập bởi nhiều luồng (Multi-threading)?",
    "options": [
      "Làm biến đó không thể bị thay đổi giá trị (bất biến)",
      "Đảm bảo tính trực quan (Visibility) bằng cách đọc/ghi trực tiếp vào bộ nhớ chính (Main Memory) thay vì CPU Cache của từng lõi, và ngăn chặn trình biên dịch reordering lệnh",
      "Tự động khóa (lock) toàn bộ class",
      "Tăng kích thước bộ nhớ của biến lên gấp đôi"
    ],
    "correct": 1,
    "explanation": "Trong kiến trúc đa lõi, mỗi CPU core có L1/L2 cache riêng. Nếu không có `volatile`, Thread 1 sửa biến ở CPU 1 có thể không được nhìn thấy bởi Thread 2 ở CPU 2. `volatile` buộc đọc/ghi thẳng vào RAM."
  },
  {
    "id": 609,
    "topic": "java",
    "topicName": "Java",
    "level": "intermediate",
    "question": "Trong Spring Framework, Scope mặc định của một Spring Bean khi khai báo là gì?",
    "options": [
      "prototype",
      "singleton",
      "request",
      "session"
    ],
    "correct": 1,
    "explanation": "Mặc định trong Spring, Bean có scope là `singleton`. Điều này có nghĩa Spring IoC Container chỉ tạo duy nhất 1 instance của bean đó cho toàn bộ vòng đời ứng dụng và dùng chung cho mọi nơi được inject."
  },
  {
    "id": 610,
    "topic": "java",
    "topicName": "Java",
    "level": "advanced",
    "question": "Tại sao Constructor Injection được khuyến nghị mạnh mẽ hơn Field Injection (@Autowired trên thuộc tính) trong Spring Boot hiện đại?",
    "options": [
      "Vì Constructor Injection làm code chạy nhanh hơn 100 lần",
      "Giúp các dependency có thể khai báo là `final` (bất biến), ngăn chặn rủi ro NullPointerException khi unit test mà không cần khởi động Spring context, và phát hiện sớm lỗi Circular Dependency",
      "Vì Field Injection đã bị xóa khỏi Java 21",
      "Constructor Injection chỉ dùng được với cơ sở dữ liệu MySQL"
    ],
    "correct": 1,
    "explanation": "Với Constructor Injection, bean không thể được khởi tạo nếu thiếu dependency, dễ dàng viết Unit Test bằng cách truyền mock object trực tiếp qua new MyService(mockRepo), và giúp class tuân thủ nguyên tắc Single Responsibility."
  },
  {
    "id": 611,
    "topic": "java",
    "topicName": "Java",
    "level": "intermediate",
    "question": "Sự khác biệt giữa Checked Exception và Unchecked Exception trong Java là gì?",
    "options": [
      "Checked Exception kế thừa từ RuntimeException; Unchecked Exception kế thừa từ Throwable",
      "Checked Exception (kế thừa từ Exception trừ RuntimeException) bắt buộc phải được xử lý bằng try-catch hoặc khai báo throws ở chữ ký hàm; Unchecked Exception (kế thừa từ RuntimeException/Error) không bắt buộc",
      "Unchecked Exception luôn làm dừng chương trình ngay lập tức",
      "Checked Exception chỉ xảy ra trong môi trường web"
    ],
    "correct": 1,
    "explanation": "Java ép lập trình viên phải xử lý Checked Exceptions (như IOException, SQLException) tại thời điểm compile time. Unchecked Exceptions (như NullPointerException, IllegalArgumentException) đại diện cho lỗi logic trong mã nguồn."
  },
  {
    "id": 612,
    "topic": "java",
    "topicName": "Java",
    "level": "advanced",
    "question": "Lớp String trong Java là Immutable (bất biến). Ưu điểm chính của thiết kế này là gì?",
    "options": [
      "Cho phép String lưu trữ được video và âm thanh",
      "An toàn tuyệt đối trong môi trường đa luồng (Thread-safe) mà không cần đồng bộ hóa (synchronization), và cho phép tối ưu bộ nhớ thông qua String Constant Pool",
      "Làm cho String có thể tự động co giãn kích thước",
      "Tự động mã hóa mật khẩu khi in ra console"
    ],
    "correct": 1,
    "explanation": "Vì không luồng nào có thể sửa đổi nội dung của một đối tượng String đã tạo ra, việc chia sẻ chuỗi giữa hàng trăm thread hoàn toàn an toàn. Đồng thời hai chuỗi giống nhau (\"abc\") sẽ trỏ cùng 1 địa chỉ trong String Pool."
  },
  {
    "id": 708,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "intermediate",
    "question": "Trong C#, sự khác biệt cốt lõi giữa struct (Value Type) và class (Reference Type) là gì?",
    "options": [
      "struct luôn lưu trữ trên Stack (hoặc inline trong đối tượng chứa nó), gán biến sẽ copy toàn bộ giá trị; class lưu trữ trên Heap và biến chỉ nắm giữ con trỏ tham chiếu đến vùng nhớ đó",
      "struct có thể kế thừa từ class khác",
      "class không thể chứa hàm khởi tạo (constructor)",
      "struct chỉ dùng được cho biến boolean"
    ],
    "correct": 0,
    "explanation": "Value types (int, float, struct) lưu trực tiếp dữ liệu và tự giải phóng khi ra khỏi stack frame. Reference types (class, interface, delegate) được cấp phát trên GC Heap và chịu sự quản lý của Garbage Collector."
  },
  {
    "id": 709,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "intermediate",
    "question": "Khi query dữ liệu chỉ để hiển thị (Read-only) trong Entity Framework Core, tại sao nên gọi hàm `.AsNoTracking()`?",
    "options": [
      "Để mã hóa dữ liệu trả về",
      "Tắt cơ chế Change Tracker của DbContext, giúp giảm đáng kể mức tiêu thụ bộ nhớ RAM và tăng tốc độ truy vấn từ 20-50%",
      "Bắt buộc EF Core phải chuyển sang dùng SQLite",
      "Tự động lưu log vào file text"
    ],
    "correct": 1,
    "explanation": "Mặc định, EF Core tạo ra snapshot của mọi entity được load để theo dõi thay đổi khi gọi SaveChanges(). Với truy vấn chỉ đọc, bật `.AsNoTracking()` loại bỏ toàn bộ overhead theo dõi này."
  },
  {
    "id": 710,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "advanced",
    "question": "Trong cơ chế Dependency Injection của ASP.NET Core, Service được đăng ký với vòng đời `AddScoped` có đặc điểm gì?",
    "options": [
      "Một instance duy nhất được tạo ra cho toàn bộ ứng dụng",
      "Mỗi lần inject là một instance hoàn toàn mới",
      "Một instance mới được tạo ra cho mỗi HTTP Request và được dùng chung cho tất cả các class trong suốt vòng đời của request đó",
      "Chỉ tồn tại trong vòng 1 giây"
    ],
    "correct": 2,
    "explanation": "3 lifetimes chính: Transient (tạo mới mỗi lần gọi), Scoped (1 instance duy nhất trên mỗi HTTP request, rất thích hợp cho DbContext), Singleton (1 instance duy nhất từ khi app bật đến khi tắt)."
  },
  {
    "id": 711,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "advanced",
    "question": "Cấu trúc kiểu `Span<T>` và `ReadOnlySpan<T>` được giới thiệu trong C# 7.2 mang lại đột phá gì?",
    "options": [
      "Cho phép viết mã HTML trực tiếp trong C#",
      "Cho phép trích xuất lát cắt bộ nhớ (memory slicing) liên tục từ mảng, chuỗi, hoặc bộ nhớ unmanaged mà KHÔNG tạo ra phân bổ bộ nhớ mới (Zero-allocation), giúp tối ưu hiệu năng cực đại",
      "Tăng tốc độ kết nối WiFi",
      "Thay thế hoàn toàn cho câu lệnh if-else"
    ],
    "correct": 1,
    "explanation": "Trước đây khi gọi `str.Substring(0, 5)`, một string mới sẽ được allocate trên Heap. Với `Span<T>`, nó chỉ là một view trỏ vào vùng nhớ có sẵn, không cấp phát thêm 1 byte nào trên Heap, loại trừ áp lực lên GC."
  },
  {
    "id": 712,
    "topic": "dotnet",
    "topicName": ".NET (C#)",
    "level": "intermediate",
    "question": "Từ khóa `record` trong C# 9+ cung cấp tính năng nổi bật nào sau đây?",
    "options": [
      "Ghi âm giọng nói lập trình viên",
      "Tạo ra các kiểu dữ liệu hướng giá trị (Value-based equality), hỗ trợ tính bất biến (Immutability) mặc định và cú pháp nhân bản không phá hủy với từ khóa `with`",
      "Chỉ chạy được trên hệ điều hành Linux",
      "Thay thế cơ sở dữ liệu SQL"
    ],
    "correct": 1,
    "explanation": "Hai record có cùng dữ liệu ở các thuộc tính sẽ được so sánh bằng nhau (`==` trả về true) mà không cần override Equals(). Cú pháp `var p2 = p1 with { Age = 30 };` giúp copy và cập nhật cực kỳ tiện lợi."
  },
  {
    "id": 808,
    "topic": "docker",
    "topicName": "Docker",
    "level": "intermediate",
    "question": "Driver mạng mặc định (Default Network Driver) khi bạn khởi chạy một standalone container trên Docker là gì?",
    "options": [
      "host",
      "overlay",
      "bridge",
      "macvlan"
    ],
    "correct": 2,
    "explanation": "Mặc định Docker tạo mạng `bridge` (thường là dải 172.17.0.0/16). Các container trên cùng bridge network có thể giao tiếp với nhau qua IP nội bộ và được NAT ra ngoài mạng host."
  },
  {
    "id": 809,
    "topic": "docker",
    "topicName": "Docker",
    "level": "intermediate",
    "question": "Trong Dockerfile, chỉ thị COPY và ADD khác nhau như thế nào và tại sao Docker khuyến nghị nên ưu tiên dùng COPY?",
    "options": [
      "COPY chạy nhanh hơn ADD 100 lần",
      "COPY chỉ sao chép file/thư mục cục bộ từ build context; ADD có thêm tính năng tự động giải nén file nén (.tar, .tar.gz) và tải file từ URL từ xa, điều này tiềm ẩn nguy cơ bảo mật và khó kiểm soát layer",
      "ADD là lệnh mới thay thế cho COPY",
      "COPY chỉ dùng cho file text"
    ],
    "correct": 1,
    "explanation": "Docker best practice: Luôn dùng COPY vì tính minh bạch và dự đoán được. Chỉ dùng ADD khi bạn thực sự cần tự động giải nén một file tarball vào thẳng image filesystem."
  },
  {
    "id": 810,
    "topic": "docker",
    "topicName": "Docker",
    "level": "advanced",
    "question": "Chỉ thị HEALTHCHECK trong Dockerfile có vai trò gì quan trọng trong môi trường Production?",
    "options": [
      "Kiểm tra nhiệt độ CPU của máy chủ",
      "Cung cấp lệnh kiểm tra định kỳ (như curl tới /health endpoint) để Docker xác định xem ứng dụng bên trong container có thực sự sẵn sàng phục vụ request hay đang bị deadlock/treo",
      "Tự động quét virus cho container",
      "Xóa các file tạm trong container"
    ],
    "correct": 1,
    "explanation": "Một container có trạng thái \"Up\" (process còn sống) chưa chắc đã hoạt động tốt (có thể bị deadlock hoặc đứt kết nối DB). HEALTHCHECK giúp Docker Swarm/Kubernetes biết khi nào container không khỏe để tự động restart hoặc ngắt traffic."
  },
  {
    "id": 811,
    "topic": "docker",
    "topicName": "Docker",
    "level": "intermediate",
    "question": "Lệnh `docker exec -it <container_id> sh` dùng để làm gì?",
    "options": [
      "Tắt container ngay lập tức",
      "Mở một phiên shell tương tác (Interactive Terminal) bên trong một container ĐANG CHẠY để debug hoặc kiểm tra file hệ thống",
      "Xóa toàn bộ dữ liệu của container",
      "Build một image mới từ container"
    ],
    "correct": 1,
    "explanation": "Cờ `-i` (interactive) giữ STDIN mở, `-t` cấp phát pseudo-TTY giả lập terminal. Lệnh này tạo ra một process mới chạy bên trong namespace của container đang hoạt động."
  },
  {
    "id": 812,
    "topic": "docker",
    "topicName": "Docker",
    "level": "advanced",
    "question": "Tại sao việc sắp xếp thứ tự các câu lệnh trong Dockerfile lại ảnh hưởng trực tiếp đến thời gian build (Build Cache)?",
    "options": [
      "Vì Docker chạy các lệnh từ dưới lên trên",
      "Vì Docker sử dụng cơ chế Layer Caching; nếu một câu lệnh (layer) bị thay đổi (như COPY source code), TẤT CẢ các câu lệnh bên dưới nó sẽ bị vô hiệu hóa cache và phải build lại từ đầu",
      "Vì thứ tự câu lệnh quyết định kích thước RAM cấp cho container",
      "Thứ tự câu lệnh không ảnh hưởng gì đến cache"
    ],
    "correct": 1,
    "explanation": "Quy tắc vàng: Đặt các lệnh ít thay đổi ở trên (như cài đặt hệ điều hành, copy package.json, npm install) và đặt các lệnh hay thay đổi ở dưới cùng (như COPY . .). Nhờ đó không phải tải lại dependencies mỗi lần sửa 1 dòng code."
  },
  {
    "id": 410,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Khi nào bạn nên dùng `useCallback` thay vì khai báo hàm thông thường trong một React Component?",
    "options": [
      "Dùng cho tất cả các hàm để tăng tốc độ mọi lúc",
      "Khi hàm đó được truyền làm prop cho một component con đã được bọc bằng `React.memo`, nhằm tránh re-render không cần thiết cho component con đó khi component cha re-render",
      "Khi cần gọi API bất đồng bộ",
      "useCallback chỉ dùng cho animation"
    ],
    "correct": 1,
    "explanation": "Bản thân `useCallback` có chi phí khởi tạo. Nó chỉ phát huy hiệu quả khi bạn truyền callback xuống một component con được tối ưu với `React.memo` hoặc đưa hàm vào dependency list của `useEffect`."
  },
  {
    "id": 411,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Thuộc tính `key` trong danh sách phần tử của React có vai trò thiết yếu nào trong thuật toán Reconciliation?",
    "options": [
      "Làm đẹp code HTML render ra",
      "Giúp React định danh duy nhất từng phần tử giữa các lần render để xác định phần tử nào được thêm, sửa, hay di chuyển thay vì phải hủy và tạo lại toàn bộ cây DOM",
      "Dùng làm CSS ID cho phần tử",
      "Tự động sắp xếp mảng theo thứ tự tăng dần"
    ],
    "correct": 1,
    "explanation": "Nếu dùng `key={index}`, khi một phần tử bị xóa hoặc chèn vào đầu mảng, toàn bộ index bị xáo trộn khiến React tưởng tất cả phần tử đều thay đổi, gây re-render sai trạng thái state và tụt giảm hiệu năng."
  },
  {
    "id": 412,
    "topic": "react",
    "topicName": "React",
    "level": "advanced",
    "question": "React Server Components (RSC) trong các framework như Next.js App Router khác gì so với Client Components thông thường?",
    "options": [
      "Server Components chỉ chạy được trên điện thoại",
      "Server Components chỉ thực thi hoàn toàn trên server, KHÔNG gửi mã JavaScript của component đó về trình duyệt (Zero Bundle Size), có thể truy cập trực tiếp Database và hệ thống file một cách an toàn",
      "Server Components không thể hiển thị hình ảnh",
      "Server Components có thể dùng các hook useState và useEffect"
    ],
    "correct": 1,
    "explanation": "RSC render ra định dạng luồng ảo (RSC payload) gửi về client mà không cần đính kèm các thư viện nặng (như markdown parser, date-fns) vào client bundle, giảm dung lượng tải trang xuống mức tối thiểu."
  },
  {
    "id": 413,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Nguyên tắc bất biến (Immutability) khi cập nhật State trong React có ý nghĩa gì?",
    "options": [
      "Không bao giờ được thay đổi giá trị của state",
      "Thay vì sửa trực tiếp giá trị bên trong object/array hiện tại (`state.push(...)`), ta phải luôn tạo ra một bản sao mới (`[...state, item]`) để React nhận biết sự thay đổi địa chỉ tham chiếu (Shallow Compare)",
      "State chỉ được phép lưu kiểu chuỗi (string)",
      "Immutability chỉ bắt buộc trong môi trường Production"
    ],
    "correct": 1,
    "explanation": "React so sánh state cũ và mới bằng `Object.is()`. Nếu bạn làm `user.name = \"An\"` rồi gọi `setUser(user)`, địa chỉ vùng nhớ không đổi nên React coi như không có gì thay đổi và KHÔNG re-render giao diện."
  },
  {
    "id": 414,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Hàm cleanup trả về trong `useEffect` được thực thi vào thời điểm nào?",
    "options": [
      "Chỉ chạy khi trang web bị đóng hoàn toàn",
      "Chạy ngay trước khi component bị unmount khỏi DOM, HOẶC chạy trước lần thực thi tiếp theo của effect đó khi dependency thay đổi",
      "Chạy cùng lúc với hàm bên trong effect",
      "Chạy khi có lỗi cú pháp"
    ],
    "correct": 1,
    "explanation": "Cleanup function được dùng để dọn dẹp các side-effects như hủy bỏ timer (`clearInterval`), hủy đăng ký sự kiện (`removeEventListener`) hoặc abort HTTP request (`abortController.abort()`), tránh rò rỉ bộ nhớ."
  },
  {
    "id": 415,
    "topic": "react",
    "topicName": "React",
    "level": "advanced",
    "question": "Trong Redux Toolkit hoặc Zustand, khái niệm \"Single Source of Truth\" (Nguồn chân lý duy nhất) mang lại lợi ích gì?",
    "options": [
      "Chỉ có 1 lập trình viên được sửa code",
      "Toàn bộ state toàn cục của ứng dụng được tập trung tại một kho lưu trữ duy nhất, giúp luồng dữ liệu một chiều minh bạch, dễ dự đoán, debug (Time-travel) và kiểm thử",
      "Loại bỏ hoàn toàn việc sử dụng API",
      "Tự động lưu state vào ổ cứng vĩnh viễn"
    ],
    "correct": 1,
    "explanation": "Khi state nằm rải rác ở hàng chục component, việc đồng bộ rất dễ gây lỗi không nhất quán. Đặt tại store duy nhất với kiến trúc luồng dữ liệu 1 chiều (Action -> Dispatch -> Reducer -> Store) làm ứng dụng cực kỳ ổn định."
  },
  {
    "id": 416,
    "topic": "react",
    "topicName": "React",
    "level": "intermediate",
    "question": "Hook nào sau đây cho phép chia sẻ dữ liệu xuyên suốt cây component mà không cần phải truyền props qua từng cấp trung gian (Prop Drilling)?",
    "options": [
      "useReducer",
      "useContext",
      "useRef",
      "useId"
    ],
    "correct": 1,
    "explanation": "`useContext` kết hợp với `React.createContext()` cho phép bất kỳ component con nào nằm bên trong `<Context.Provider>` có thể trực tiếp lấy dữ liệu (như Theme, Auth User, Language) mà không cần cha mẹ chuyền tay nhau."
  },
  {
    "id": 904,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Trong kiến trúc Event Loop của Node.js (libuv), thứ tự thực thi của các pha (Phases) diễn ra như thế nào?",
    "options": [
      "Close -> Check -> Poll -> Timers",
      "Timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check -> Close Callbacks",
      "Poll -> Timers -> Check -> Close",
      "Tất cả các pha chạy song song cùng một lúc"
    ],
    "correct": 1,
    "explanation": "Event Loop của libuv chia thành các pha nghiêm ngặt: Timers (setTimeout/setInterval) -> Pending I/O -> Idle -> Poll (lấy I/O events mới) -> Check (setImmediate) -> Close Callbacks (socket.on('close'))."
  },
  {
    "id": 905,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "advanced",
    "question": "Khi nào bạn nên sử dụng module `worker_threads` trong Node.js?",
    "options": [
      "Khi cần xử lý các tác vụ CPU-intensive (như mã hóa dữ liệu lớn, nén video, xử lý thuật toán phức tạp) để không làm tắc nghẽn Main Event Loop",
      "Khi cần đọc một file text nhỏ",
      "Khi gửi request HTTP đến một trang web",
      "worker_threads chỉ dùng để kết nối với cơ sở dữ liệu MongoDB"
    ],
    "correct": 0,
    "explanation": "Node.js non-blocking I/O rất nhanh cho các tác vụ I/O, nhưng nếu chạy 1 vòng lặp for tính toán hàng tỷ phép tính trên Main Thread thì toàn bộ server sẽ đơ. `worker_threads` tạo ra luồng thật chạy song song chia sẻ bộ nhớ qua SharedArrayBuffer."
  },
  {
    "id": 906,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Module `cluster` trong Node.js cho phép ứng dụng mở rộng (scale) theo phương thức nào?",
    "options": [
      "Tự động mua thêm RAM từ đám mây",
      "Khởi tạo nhiều tiến trình con (child processes / workers) chia sẻ chung cùng một cổng mạng (port), tận dụng triệt để kiến trúc CPU đa nhân (Multi-core) của máy chủ",
      "Chuyển đổi code JavaScript sang C++",
      "Tự động sao lưu database"
    ],
    "correct": 1,
    "explanation": "Vì Node.js chỉ chạy trên 1 core CPU, trên một VPS có 8 cores thì 7 cores còn lại sẽ rảnh rỗi. `cluster` tạo ra 8 worker processes lắng nghe chung 1 port qua cơ chế Round-Robin của tiến trình Master."
  },
  {
    "id": 907,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Tại sao việc gọi `process.on('uncaughtException', ...)` chỉ nên dùng để log lỗi và khởi động lại tiến trình (graceful exit) chứ không nên cho ứng dụng chạy tiếp?",
    "options": [
      "Vì Node.js sẽ tự động khóa file",
      "Vì khi một ngoại lệ chưa bắt xảy ra, ứng dụng đã rơi vào trạng thái không xác định (corrupted state); tiếp tục chạy có thể dẫn đến rò rỉ tài nguyên, mất tính toàn vẹn dữ liệu và deadlock",
      "Vì hệ điều hành sẽ xóa code của bạn",
      "Lỗi uncaughtException không bao giờ xảy ra trong thực tế"
    ],
    "correct": 1,
    "explanation": "Khi uncaughtException nổ ra, các socket có thể đang mở dở, database transaction chưa hoàn tất. Tài liệu chính thức của Node khuyến cáo: Log lỗi, đóng kết nối an toàn và thoát (`process.exit(1)`), sau đó để Process Manager (PM2 / K8s) restart lại pod mới sạch sẽ."
  },
  {
    "id": 908,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Trong Express.js, thứ tự khai báo Middleware có ý nghĩa như thế nào?",
    "options": [
      "Không quan trọng, Express tự động sắp xếp lại",
      "Cực kỳ quan trọng: Middleware được thực thi tuần tự từ trên xuống dưới theo thứ tự đăng ký qua `app.use()`; middleware gọi `next()` sẽ chuyển quyền sang middleware kế tiếp",
      "Middleware khai báo dưới cùng luôn chạy trước",
      "Chỉ có tối đa 2 middleware được phép hoạt động"
    ],
    "correct": 1,
    "explanation": "Ví dụ: Middleware phân tích body (`express.json()`) và xác thực Auth phải được đặt TRƯỚC các routes xử lý nghiệp vụ, và Error Handling Middleware (`(err, req, res, next) => ...`) phải được đặt ở CUỐI CÙNG."
  },
  {
    "id": 909,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "intermediate",
    "question": "Đối tượng `Buffer` trong Node.js được thiết kế nhằm mục đích gì?",
    "options": [
      "Lưu trữ giao diện người dùng",
      "Lưu trữ và xử lý trực tiếp các luồng dữ liệu nhị phân (raw binary data) trong bộ nhớ ngoài vùng nhớ V8 Heap",
      "Chỉ dùng để nối chuỗi text",
      "Tự động nén dung lượng hình ảnh"
    ],
    "correct": 1,
    "explanation": "JavaScript thuần thời kỳ đầu không có cơ chế xử lý byte nhị phân. Buffer của Node.js cấp phát trực tiếp bộ nhớ C++ raw ngoài V8 garbage-collected heap, chuyên xử lý stream file, packet TCP, và mã hóa mã hóa crypto."
  },
  {
    "id": 910,
    "topic": "nodejs",
    "topicName": "Node.js",
    "level": "advanced",
    "question": "Nguy cơ tiềm ẩn lớn nhất khi sử dụng EventEmitter trong Node.js mà quên gọi `removeListener` là gì?",
    "options": [
      "Xóa mất file mã nguồn",
      "Rò rỉ bộ nhớ (Memory Leak), vì EventEmitter vẫn giữ tham chiếu tham chiếu đến các callback functions và các biến trong closure scope của nó, khiến Garbage Collector không thể thu hồi",
      "CPU bị quá nhiệt",
      "Mạng internet bị ngắt kết nối"
    ],
    "correct": 1,
    "explanation": "Node.js sẽ in ra cảnh báo `MaxListenersExceededWarning` nếu có quá 10 listeners được gắn vào 1 emitter mà không gỡ bỏ. Nếu mỗi request tạo thêm 1 listener mà không dọn, RAM của Node process sẽ tăng liên tục cho đến khi sập."
  },
  {
    "id": 954,
    "topic": "database",
    "topicName": "Database",
    "level": "intermediate",
    "question": "Sự khác biệt cốt lõi giữa Clustered Index (Chỉ mục cụm) và Non-Clustered Index (Chỉ mục không cụm) là gì?",
    "options": [
      "Clustered Index chỉ dùng cho số, Non-Clustered Index chỉ dùng cho chữ",
      "Clustered Index trực tiếp sắp xếp lại thứ tự lưu trữ vật lý của các dòng dữ liệu trên ổ đĩa (mỗi bảng chỉ có 1 Clustered Index, thường là Khóa chính); Non-Clustered Index lưu cấu trúc trỏ riêng biệt đến vị trí bản ghi thực tế",
      "Non-Clustered Index làm chậm tốc độ đọc",
      "Clustered Index lưu trong bộ nhớ RAM, Non-Clustered Index lưu trong ROM"
    ],
    "correct": 1,
    "explanation": "Giống như mục lục cuốn từ điển: Từ điển được sắp xếp theo bảng chữ cái A-Z từ đầu đến cuối (Clustered Index). Ngược lại mục lục chỉ mục ở cuối sách trỏ đến số trang là Non-Clustered Index."
  },
  {
    "id": 955,
    "topic": "database",
    "topicName": "Database",
    "level": "intermediate",
    "question": "Mục đích chính của Chuẩn hóa cơ sở dữ liệu (Normalization - từ 1NF đến 3NF) là gì?",
    "options": [
      "Làm cho database chạy chậm hơn để bảo mật",
      "Giảm thiểu tối đa sự dư thừa dữ liệu (Data Redundancy) và ngăn ngừa các dị thường dữ liệu (Anomalies) khi Insert, Update, Delete",
      "Gộp tất cả dữ liệu vào trong một bảng duy nhất",
      "Tự động tạo bản sao lưu dữ liệu"
    ],
    "correct": 1,
    "explanation": "Dư thừa dữ liệu làm tốn ổ đĩa và dẫn đến hiện tượng không nhất quán: Cập nhật địa chỉ khách hàng ở bảng này nhưng quên cập nhật ở bảng khác. 3NF chia nhỏ bảng và liên kết bằng khóa ngoại (Foreign Key)."
  },
  {
    "id": 956,
    "topic": "database",
    "topicName": "Database",
    "level": "advanced",
    "question": "Cơ chế Optimistic Locking (Khóa lạc quan) trong xử lý tranh chấp giao dịch thường được triển khai như thế nào?",
    "options": [
      "Khóa cứng toàn bộ bảng bằng lệnh LOCK TABLE",
      "Sử dụng một cột số hiệu phiên bản (`version` hoặc `updated_at`); khi update kiểm tra `WHERE id = ? AND version = ?`, nếu không dòng nào được cập nhật nghĩa là đã có giao dịch khác can thiệp trước",
      "Chặn tất cả người dùng khác đăng nhập",
      "Tự động gửi email thông báo cho quản trị viên"
    ],
    "correct": 1,
    "explanation": "Optimistic Locking không khóa tài nguyên thực tế mà giả định xung đột hiếm khi xảy ra. Câu lệnh: `UPDATE accounts SET balance = ?, version = version + 1 WHERE id = 1 AND version = 5`. Nếu số dòng update = 0, ứng dụng rollback và retry."
  },
  {
    "id": 957,
    "topic": "database",
    "topicName": "Database",
    "level": "advanced",
    "question": "Thành phần Write-Ahead Logging (WAL) trong các hệ quản trị CSDL quan hệ (PostgreSQL/MySQL InnoDB Redo Log) phục vụ mục tiêu gì?",
    "options": [
      "Lưu trữ nhật ký chat của người dùng",
      "Đảm bảo tính bền vững (Durability trong ACID) và hỗ trợ phục hồi sau sự cố (Crash Recovery) bằng cách ghi tuần tự thay đổi vào file log trên đĩa trước khi ghi vào các khối dữ liệu ngẫu nhiên",
      "Tự động nén database",
      "Xóa các bảng không sử dụng"
    ],
    "correct": 1,
    "explanation": "Ghi ngẫu nhiên (Random I/O) vào file data rất chậm. WAL ghi tuần tự (Sequential I/O) cực nhanh vào log. Khi server bị mất điện đột ngột, khi khởi động lại DB chỉ cần đọc WAL để Replay lại các giao dịch đã commit an toàn."
  },
  {
    "id": 958,
    "topic": "database",
    "topicName": "Database",
    "level": "intermediate",
    "question": "Khi một truy vấn SQL rơi vào tình trạng \"Table Scan\" (hoặc Full Table Scan) trên bảng có 10 triệu bản ghi, nguyên nhân phổ biến nhất là gì?",
    "options": [
      "Do database quá xịn",
      "Do điều kiện WHERE không sử dụng cột có Index, hoặc sử dụng các hàm/toán tử làm vô hiệu hóa Index (như `WHERE YEAR(created_at) = 2024` hay `WHERE name LIKE '%abc'`)",
      "Do bảng có quá ít dữ liệu",
      "Do mạng internet bị lag"
    ],
    "correct": 1,
    "explanation": "B-Tree Index sắp xếp từ trái qua phải. Tìm kiếm `%abc` buộc DB phải duyệt từng dòng vì không biết ký tự đầu tiên là gì. Bọc cột trong hàm `YEAR(col)` cũng làm mất tác dụng của index trừ khi dùng Functional/Expression Index."
  },
  {
    "id": 959,
    "topic": "database",
    "topicName": "Database",
    "level": "intermediate",
    "question": "Sự khác biệt cốt lõi giữa cơ sở dữ liệu quan hệ (SQL/RDBMS) và cơ sở dữ liệu phi quan hệ (NoSQL Document Store như MongoDB) là gì?",
    "options": [
      "SQL chỉ lưu được văn bản tiếng Anh",
      "SQL có cấu trúc schema cố định dạng bảng, bảo đảm tính ACID nghiêm ngặt; NoSQL linh hoạt schema (JSON/BSON), dễ dàng mở rộng theo chiều ngang (Horizontal Scaling / Sharding)",
      "NoSQL không thể lưu trữ dữ liệu người dùng",
      "SQL không bao giờ bị lỗi phần mềm"
    ],
    "correct": 1,
    "explanation": "RDBMS (Postgres, MySQL) tối ưu cho quan hệ phức tạp, toàn vẹn dữ liệu giao dịch tài chính. NoSQL (MongoDB, DynamoDB) tối ưu cho dữ liệu phân tán, schema thay đổi liên tục, và khả năng sharding qua hàng trăm máy chủ."
  },
  {
    "id": 960,
    "topic": "database",
    "topicName": "Database",
    "level": "advanced",
    "question": "Mức độ cô lập giao dịch (Transaction Isolation Level) cao nhất trong chuẩn SQL là gì?",
    "options": [
      "Read Uncommitted",
      "Read Committed",
      "Repeatable Read",
      "Serializable"
    ],
    "correct": 3,
    "explanation": "Serializable là cấp độ cô lập an toàn tuyệt đối nhất: Nó bảo đảm các giao dịch chạy song song cho ra kết quả giống hệt như khi chạy tuần tự từng cái một (loại trừ hoàn toàn Dirty Read, Non-repeatable Read, và Phantom Read)."
  }
];

export function getQuestionsByTopic(topicId: string): QuizQuestion[] {
  if (!topicId || topicId === 'all') {
    return ALL_QUIZ_QUESTIONS;
  }
  return ALL_QUIZ_QUESTIONS.filter(q => q.topic.toLowerCase() === topicId.toLowerCase());
}

export function getRandomQuestions(topicId: string, count: number): QuizQuestion[] {
  const pool = getQuestionsByTopic(topicId);
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  if (count <= 0 || count >= shuffled.length) {
    return shuffled;
  }
  return shuffled.slice(0, count);
}

export function getTopicQuestionCount(topicId: string): number {
  if (topicId === 'all') return ALL_QUIZ_QUESTIONS.length;
  return ALL_QUIZ_QUESTIONS.filter(q => q.topic.toLowerCase() === topicId.toLowerCase()).length;
}
