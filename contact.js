let users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phoneNumber: "012456789",
    emnail: "nva@email.com",
  },
];

let nextId = 2;
users.length;

const nameInput = document.querySelector("#contact-name");
const phoneInput = document.querySelector("#contact-phone");
const emailInput = document.querySelector("#contact-email");

const tbody = document.querySelector("#contact-tbody");

const regexName = (name) => {
  return /^[a-zA-Z ]+$/.test(name);
};

const regexPhone = (number) => {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};

const regexEmail = (email) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};

const validate = (name, phone, email) => {
  // validate Name
  if (name === "") {
    alert("Họ tên không được để trống!");
    return false;
  }
  if (name.length < 2) {
    alert("Họ tên phải có ít nhất 2 ký tự!");
    return false;
  }
  if (!regexName(name)) {
    alert("Họ tên không được chứa số hoặc ký tự đặc biệt!");
    return false;
  }
  // validate phone
  if (phone === "") {
    alert("Số điện thoại không được để trống!");
    return false;
  }
  if (regexPhone(phone)) {
    alert(
      "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 chữ số (bắt đầu bằng 0) hoặc định dạng quốc tế (+84...)",
    );
    return false;
  }
  // validate email
  if (email === "") {
    alert("Email không được để trống!");
    return false;
  }
  if (regexEmail(email)) {
    alert("Email không hợp lệ!");
    return false;
  }
};

const renderUser = () => {
  tbody.innerHTML = "";

  users.forEach((user) => tbody.appendChild(createUser(user)));
};

const createUser = (user) => {
  const tr = document.createElement("tr");

  const tdSTT = document.createElement("td");
  tdSTT.textContent = user.id;

  const tdName = document.createElement("td");
  tdName.textContent = user.name;

  const tdPhoneNumber = document.createElement("td");
  tdPhoneNumber.textContent = user.phoneNumber;

  const tdEmail = document.createElement("td");
  tdEmail.textContent = user.emnail;

  const tdAction = document.createElement("td");

  const actionButton = document.createElement("div");
  actionButton.className = "action-buttons";

  const actionButtonEdit = document.createElement("button");
  actionButtonEdit.className = "btn-edit";
  actionButtonEdit.textContent = "Sửa";

  const actionButtonDelete = document.createElement("button");
  actionButtonDelete.className = "btn-delete";
  actionButtonDelete.textContent = "Xóa";

  actionButton.appendChild(actionButtonEdit);
  actionButton.appendChild(actionButtonDelete);

  tdAction.appendChild(actionButton);

  tr.appendChild(tdSTT);
  tr.appendChild(tdName);
  tr.appendChild(tdPhoneNumber);
  tr.appendChild(tdEmail);
  tr.appendChild(tdAction);

  return tr;
};

const addUser = () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (validate(name, phone, email)) {
  }
};

const main = () => {
  renderUser();
};

main();
