// config/swagger.js - Swagger Configuration
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'A comprehensive Task Management API built with Express.js and Sequelize ORM',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Member: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Member ID',
              example: 1
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'john_doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'john@example.com'
            },
            first_name: {
              type: 'string',
              description: 'First name',
              example: 'John'
            },
            last_name: {
              type: 'string',
              description: 'Last name',
              example: 'Doe'
            },
            is_active: {
              type: 'boolean',
              description: 'Active status',
              example: true
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Task ID',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Task title',
              example: 'Complete project documentation'
            },
            description: {
              type: 'string',
              description: 'Task description',
              example: 'Write comprehensive documentation for the project'
            },
            priority: {
              type: 'string',
              enum: ['urgent', 'high', 'medium', 'low'],
              description: 'Task priority',
              example: 'high'
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed', 'cancelled'],
              description: 'Task status',
              example: 'in_progress'
            },
            due_date: {
              type: 'string',
              format: 'date-time',
              description: 'Due date',
              example: '2024-01-15T10:00:00Z'
            },
            member_id: {
              type: 'integer',
              description: 'Assigned member ID',
              example: 1
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        TaskItem: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Task item ID',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Task item title',
              example: 'Research phase'
            },
            description: {
              type: 'string',
              description: 'Task item description',
              example: 'Gather requirements and research'
            },
            is_completed: {
              type: 'boolean',
              description: 'Completion status',
              example: false
            },
            order: {
              type: 'integer',
              description: 'Display order',
              example: 1
            },
            completed_at: {
              type: 'string',
              format: 'date-time',
              description: 'Completion timestamp'
            },
            task_id: {
              type: 'integer',
              description: 'Parent task ID',
              example: 1
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Error message'
            },
            message: {
              type: 'string',
              example: 'Detailed error description'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js'] // Path to the API files
};

const specs = swaggerJSDoc(options);

module.exports = specs;