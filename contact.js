let users = [];
let nextId = 1;
let editingId = null;

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#contact-name");
const phoneInput = document.querySelector("#contact-phone");
const emailInput = document.querySelector("#contact-email");
const submitButton = document.querySelector(".btn-add");
const tbody = document.querySelector("#contact-tbody");

const NAME_REGEX = /^[a-zA-Z\u00C0-\u1EF9\s]+$/;
const PHONE_REGEX = /^(0|\+84)[0-9]{9,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFormMode(mode) {
  if (mode === "edit") {
    submitButton.textContent = "Cập nhật";
    return;
  }
  submitButton.textContent = "Thêm";
}

function resetForm() {
  form.reset();
  editingId = null;
  setFormMode("add");
  nameInput.focus();
}

function validateContact({ name, phone, email }, { excludeId = null } = {}) {
  // Họ tên
  if (name === "") {
    alert("Họ tên không được để trống!");
    return false;
  }
  if (name.length < 2) {
    alert("Họ tên phải có ít nhất 2 ký tự!");
    return false;
  }
  if (!NAME_REGEX.test(name)) {
    alert("Họ tên không được chứa số hoặc ký tự đặc biệt!");
    return false;
  }

  // Số điện thoại
  if (phone === "") {
    alert("Số điện thoại không được để trống!");
    return false;
  }
  if (!PHONE_REGEX.test(phone)) {
    alert(
      "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 chữ số (bắt đầu bằng 0) hoặc định dạng quốc tế (+84...)",
    );
    return false;
  }

  // Email
  if (email === "") {
    alert("Email không được để trống!");
    return false;
  }
  if (!EMAIL_REGEX.test(email)) {
    alert("Email không hợp lệ!");
    return false;
  }
  const isDuplicateEmail = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== excludeId,
  );
  if (isDuplicateEmail) {
    alert("Email đã tồn tại trong danh bạ!");
    return false;
  }

  return true;
}

function renderUsers() {
  tbody.innerHTML = "";

  if (users.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.className = "empty-state";
    td.innerHTML = "<p>Chưa có liên hệ nào.</p>";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  users.forEach((user, index) => {
    tbody.appendChild(createUserRow(user, index));
  });
}

function createUserRow(user, index) {
  const tr = document.createElement("tr");

  const tdSTT = document.createElement("td");
  tdSTT.textContent = String(index + 1);

  const tdName = document.createElement("td");
  tdName.textContent = user.name;

  const tdPhone = document.createElement("td");
  tdPhone.textContent = user.phone;

  const tdEmail = document.createElement("td");
  tdEmail.textContent = user.email;

  const tdAction = document.createElement("td");
  const actionButtons = document.createElement("div");
  actionButtons.className = "action-buttons";

  const btnEdit = document.createElement("button");
  btnEdit.type = "button";
  btnEdit.className = "btn-edit";
  btnEdit.textContent = "Sửa";
  btnEdit.addEventListener("click", () => startEdit(user.id));

  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.className = "btn-delete";
  btnDelete.textContent = "Xóa";
  btnDelete.addEventListener("click", () => deleteUser(user.id));

  actionButtons.appendChild(btnEdit);
  actionButtons.appendChild(btnDelete);
  tdAction.appendChild(actionButtons);

  tr.appendChild(tdSTT);
  tr.appendChild(tdName);
  tr.appendChild(tdPhone);
  tr.appendChild(tdEmail);
  tr.appendChild(tdAction);

  return tr;
}

function addUser({ name, phone, email }) {
  const newUser = {
    id: nextId++,
    name,
    phone,
    email,
  };
  users.push(newUser);
}

function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const contact = { name, phone, email };

  if (editingId === null) {
    if (!validateContact(contact)) return;
    addUser(contact);
    resetForm();
    alert("Thêm liên hệ thành công!");
    renderUsers();
    return;
  }

  if (!validateContact(contact, { excludeId: editingId })) return;
  updateUser(editingId, contact);
  resetForm();
  renderUsers();
}

function main() {
  setFormMode("add");
  renderUsers();
  form.addEventListener("submit", handleSubmit);
}

main();
