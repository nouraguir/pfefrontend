import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import axios from "axios";
import moment from "moment";
import "./Project.css";

const { confirm } = Modal;
const { Option } = Select;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "",
    technology: "",
    assigned_to: "",
    start_date: null,
    due_date: null,
  });
  const [editingProject, setEditingProject] = useState(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setNewProject({ ...newProject, [name]: value });
  };

  const handleDateChange = (date, dateString, name) => {
    console.log(date, dateString, name);
    setNewProject({ ...newProject, [dateString]: date });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditingProject({ ...editingProject, [name]: value });
  };

  const handleEditSelectChange = (value, name) => {
    setEditingProject({ ...editingProject, [name]: value });
  };

  const handleEditDateChange = (date, dateString, name) => {
    setEditingProject({ ...editingProject, [name]: dateString });
  };

  const handleAddProject = async () => {
    try {
      const res = await axios.post("/api/projects", newProject);
      setProjects([...projects, res.data]);
      setShowAddProjectModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProject = async () => {
    try {
      const res = await axios.put(
        `/api/projects/${editingProject._id}`,
        editingProject
      );
      setProjects(
        projects.map((project) =>
          project._id === res.data._id ? res.data : project
        )
      );
      setEditingProject(null);
      setShowEditProjectModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this project?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteProject(id);
      },
    });
  };

  const handleDeleteProject = async (id) => {
    try {
      const res = await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const showEditModal = (project) => {
    setEditingProject(project);
    setShowEditProjectModal(true);
  };

  const showAddModal = () => {
    setShowAddProjectModal(true);
  };

  const handleCancel = () => {
    setShowAddProjectModal(false);
    setShowEditProjectModal(false);
  };

  return (
    <>
    <Row gutter={16}>
        <Col md={16}>
      <div className="projects">
        <h1>Projects</h1>
        <Button type="primary" onClick={showAddModal}>
          Add Project
        </Button>
        <Row gutter={[16, 16]}>
          {projects.map((project) => (
            <Col span={8} key={project._id}>
              <Card
                title={project.title}
                extra={
                  <>
                    <Button onClick={() => showEditModal(project)}>Edit</Button>
                    <Button
                      type="danger"
                      onClick={() => showDeleteConfirm(project._id)}
                    >
                      Delete
                    </Button>
                  </>
                }
              >
                <p>Description: {project.description}</p>
                <p>Status: {project.status}</p>
                <p>Technology: {project.technology}</p>
                <p>Assigned To: {project.assigned_to}</p>
                <p>
                  Start Date:{" "}
                  {moment(project.start_date).format("MMMM Do YYYY")}
                </p>
                <p>
                  Due Date: {moment(project.due_date).format("MMMM Do YYYY")}
                </p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Add Project Modal */}
        <Modal
          title="Add Project"
          visible={showAddProjectModal}
          onOk={handleAddProject}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label="Title">
              <Input name="title" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Description">
              <Input name="description" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Status">
              <Select onChange={(value) => handleSelectChange(value, "status")}>
                <Option value="in progress">In Progress</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Technology">
              <Input name="technology" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item label="Assigned To">
              <Select
                onChange={(value) => handleSelectChange(value, "assigned_to")}
              >
                {users.map((user) => (
                  <Option value={user.name} key={user._id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Start Date">
              <DatePicker
                onChange={(date, dateString) =>
                  handleDateChange(date, dateString, "start_date")
                }
              />
            </Form.Item>
            <Form.Item label="Due Date">
              <DatePicker
                onChange={(date, dateString) =>
                  handleDateChange(date, dateString, "due_date")
                }
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Project Modal */}
        {editingProject && (
          <Modal
            title="Edit Project"
            visible={showEditProjectModal}
            onOk={handleEditProject}
            onCancel={handleCancel}
          >
            <Form>
              <Form.Item label="Title">
                <Input
                  name="title

"
                  onChange={handleEditInputChange}
                  defaultValue={editingProject.title}
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  name="description"
                  onChange={handleEditInputChange}
                  defaultValue={editingProject.description}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Select
                  onChange={(value) => handleEditSelectChange(value, "status")}
                  defaultValue={editingProject.status}
                >
                  <Option value="in progress">In Progress</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Technology">
                <Input
                  name="technology"
                  onChange={handleEditInputChange}
                  defaultValue={editingProject.technology}
                />
              </Form.Item>
              <Form.Item label="Assigned To">
                <Select
                  onChange={(value) =>
                    handleEditSelectChange(value, "assigned_to")
                  }
                  defaultValue={editingProject.assigned_to}
                >
                  {users.map((user) => (
                    <Option value={user.name} key={user._id}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Start Date">
                <DatePicker
                  onChange={(date, dateString) =>
                    handleEditDateChange(date, dateString, "start_date")
                  }
                  defaultValue={moment(editingProject.start_date)}
                />
              </Form.Item>
              <Form.Item label="Due Date">
                <DatePicker
                  onChange={(date, dateString) =>
                    handleEditDateChange(date, dateString, "due_date")
                  }
                  defaultValue={moment(editingProject.due_date)}
                />
              </Form.Item>
            </Form>
          </Modal>
        )}

      
      </div>
      </Col>
      </Row>
    </>
  );
};

export default Projects;
