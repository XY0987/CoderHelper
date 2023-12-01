export const APIdate = {
  definitions: {
    JsonResult: {
      type: 'object',
      properties: {
        data: {
          type: 'object'
        },
        msg: {
          type: 'string'
        },
        ok: {
          type: 'string'
        },
        status: {
          type: 'integer',
          format: 'int32'
        }
      },
      title: 'JsonResult'
    },
    StreamingResponseBody: {
      type: 'object',
      title: 'StreamingResponseBody'
    }
  },
  'x-swagger': '2.0',
  'x-info': {
    description: 'controller层接口',
    version: '1.0',
    title: 'api接口文档',
    license: {
      name: '招新系统接口文档'
    }
  },
  'x-host': '47.116.41.66:9527',
  'x-basePath': '/',
  'x-tags': [
    {
      name: 'excel管理',
      description: 'Excel Controller'
    },
    {
      name: '人员管理',
      description: 'Admin Controller'
    },
    {
      name: '普通用户接口',
      description: 'User Controller'
    },
    {
      name: '简历管理',
      description: 'Resume Controller'
    },
    {
      name: '面试题类别接口',
      description: 'Type Controller'
    },
    {
      name: '题库管理',
      description: 'Question Controller'
    }
  ],
  'x-paths': {
    '/admin/allPage': {
      get: {
        tags: ['人员管理'],
        summary: '小组人员列表',
        operationId: 'allPageUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'pageNum',
            description: '页数',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'pageSize',
            description: '页数大小',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/admin/users': {
      post: {
        tags: ['人员管理'],
        summary: '批量导入人员信息',
        operationId: 'addUserByExcelUsingPOST',
        consumes: ['multipart/form-data'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'file',
            in: 'formData',
            description: 'file',
            required: false,
            type: 'file'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      put: {
        tags: ['人员管理'],
        summary: '批量重置人员密码',
        operationId: 'updateUserPasswordUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'ids',
            in: 'query',
            description: '人员id',
            required: true,
            type: 'ref'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      delete: {
        tags: ['人员管理'],
        summary: '批量删除人员信息',
        operationId: 'deleteUsersUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'ids',
            in: 'query',
            description: '人员id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passAll': {
      get: {
        tags: ['excel管理'],
        summary: '已录取',
        operationId: 'passAllUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passFirstExcelOne': {
      get: {
        tags: ['excel管理'],
        summary: '待二面excel(内部人员看)',
        operationId: 'passFirstExcelByOurUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passFirstExcelTwo': {
      get: {
        tags: ['excel管理'],
        summary: '待二面excel',
        operationId: 'passFirstExcelUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passSecondExcel': {
      get: {
        tags: ['excel管理'],
        summary: '待三面excel',
        operationId: 'passSecondExcelUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passSecondExcelTwo': {
      get: {
        tags: ['excel管理'],
        summary: '待三面excel(内部人员看)',
        operationId: 'passSecondExcelByOurUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passWrittenExcelOne': {
      get: {
        tags: ['excel管理'],
        summary: '待一面excel',
        operationId: 'passWrittenExcelUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/passWrittenExcelTwo': {
      get: {
        tags: ['excel管理'],
        summary: '待一面excel(内部人员看)',
        operationId: 'passWrittenExcelByOurUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/excel/waiteWrittenExcel': {
      get: {
        tags: ['excel管理'],
        summary: '待笔试excel',
        operationId: 'waiteWrittenExcelUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'data',
            in: 'query',
            description: '面试时间(yyyy年MM月dd日HH时mm分)',
            required: true,
            type: 'string',
            format: 'date'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'StreamingResponseBody',
              $ref: '#/definitions/StreamingResponseBody'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/questions/page': {
      get: {
        tags: ['题库管理'],
        summary: '题目分页',
        operationId: 'pageUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'pageNum',
            in: 'query',
            description: '页数',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'pageSize',
            in: 'query',
            description: '页面大小',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'questionBankType',
            in: 'query',
            description: '类别id(笔试 0   面试 1)',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'typeId',
            in: 'query',
            description: '类别id',
            required: false,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/questions/question': {
      get: {
        tags: ['题库管理'],
        summary: '取出某一题',
        operationId: 'getOneQuestionUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'id',
            description: '题目id',
            required: true,
            schema: {
              originalRef: 'integer',
              $ref: '#/definitions/integer'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      post: {
        tags: ['题库管理'],
        summary: '添加题目',
        operationId: 'addQuestionUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'answer',
            in: 'query',
            required: false,
            type: 'string'
          },
          {
            name: 'createTime',
            in: 'query',
            required: false,
            type: 'string',
            format: 'date-time'
          },
          {
            name: 'id',
            in: 'query',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'question',
            in: 'query',
            required: false,
            type: 'string'
          },
          {
            name: 'questionBankType',
            in: 'query',
            description: '题库类型',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'typeId',
            in: 'query',
            description: '问题类型',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'updateTime',
            in: 'query',
            required: false,
            type: 'string',
            format: 'date-time'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      put: {
        tags: ['题库管理'],
        summary: '修改题目',
        operationId: 'updateQuestionUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'answer',
            in: 'query',
            description: '答案',
            required: false,
            type: 'string'
          },
          {
            name: 'id',
            in: 'query',
            description: '问题id',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'question',
            in: 'query',
            description: '问题',
            required: false,
            type: 'string'
          },
          {
            name: 'questionBankType',
            in: 'query',
            description: '类别id(笔试 0   面试 1)',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'typeId',
            in: 'query',
            description: '类别id',
            required: false,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      delete: {
        tags: ['题库管理'],
        summary: '删除题目',
        operationId: 'deleteQuestionUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'ids',
            in: 'query',
            description: 'ids',
            required: true,
            type: 'array',
            items: {
              type: 'integer',
              format: 'int32'
            },
            collectionFormat: 'multi'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/questions/random': {
      get: {
        tags: ['题库管理'],
        summary: '随机一题',
        operationId: 'getRandomQuestionUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'typeId',
            description: '类别id',
            required: true,
            schema: {
              originalRef: 'integer',
              $ref: '#/definitions/integer'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/questions/test': {
      post: {
        tags: ['题库管理'],
        summary: '测试限流',
        operationId: 'testUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'aa',
            in: 'query',
            description: 'aa',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/resume/querry': {
      get: {
        tags: ['简历管理'],
        summary: '查找简历',
        operationId: 'queryFileUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'claas',
            in: 'query',
            description: '班级',
            required: false,
            type: 'string'
          },
          {
            name: 'name',
            in: 'query',
            description: '姓名',
            required: false,
            type: 'string'
          },
          {
            name: 'pageNum',
            in: 'query',
            description: 'pageNum',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'pageSize',
            in: 'query',
            description: 'pageSize',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'qq',
            in: 'query',
            description: 'qq',
            required: false,
            type: 'string'
          },
          {
            name: 'sex',
            in: 'query',
            description: '性别',
            required: false,
            type: 'string'
          },
          {
            name: 'studentId',
            in: 'query',
            description: '学号',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/resume/resume': {
      get: {
        tags: ['简历管理'],
        summary: '取出指定简历',
        operationId: 'getFileUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'userId',
            description: 'userId',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      put: {
        tags: ['简历管理'],
        summary: '修改简历',
        operationId: 'updateFilePositiveUsingPUT',
        consumes: ['multipart/form-data'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'id',
            description: 'id',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32'
            }
          },
          {
            name: 'one',
            in: 'formData',
            description: 'one',
            required: false,
            type: 'file'
          },
          {
            name: 'two',
            in: 'formData',
            description: 'two',
            required: false,
            type: 'file'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      delete: {
        tags: ['简历管理'],
        summary: '删除简历',
        operationId: 'deleteFilePositiveUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'ids',
            in: 'query',
            description: 'ids',
            required: true,
            type: 'array',
            items: {
              type: 'string'
            },
            collectionFormat: 'multi'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/resume/resumes': {
      post: {
        tags: ['简历管理'],
        summary: '上传简历',
        operationId: 'addFilePositiveUsingPOST',
        consumes: ['multipart/form-data'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: 'id',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'one',
            in: 'formData',
            description: 'one',
            required: false,
            type: 'file'
          },
          {
            name: 'two',
            in: 'formData',
            description: 'two',
            required: false,
            type: 'file'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/types/type': {
      get: {
        tags: ['面试题类别接口'],
        summary: '查询',
        operationId: 'getTypeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: 'id',
            required: false,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      post: {
        tags: ['面试题类别接口'],
        summary: '添加类别',
        operationId: 'addTypeUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'typeName',
            in: 'query',
            description: '类别名称',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      put: {
        tags: ['面试题类别接口'],
        summary: '修改类别',
        operationId: 'updateTypeUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'id',
            description: '类别id',
            required: false,
            schema: {
              originalRef: 'integer',
              $ref: '#/definitions/integer'
            }
          },
          {
            name: 'typeName',
            in: 'query',
            description: '类别名称',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      delete: {
        tags: ['面试题类别接口'],
        summary: '删除',
        operationId: 'deleteTypeUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'ids',
            in: 'query',
            description: 'ids',
            required: true,
            type: 'array',
            items: {
              type: 'integer',
              format: 'int32'
            },
            collectionFormat: 'multi'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/aboutInfo': {
      get: {
        tags: ['普通用户接口'],
        summary: '面评以及历次面试各项成绩',
        operationId: 'aboutInfoUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/allPeople': {
      get: {
        tags: ['普通用户接口'],
        summary: '所有人员分页',
        operationId: 'allPeopleUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: '姓名',
            required: false,
            type: 'string'
          },
          {
            name: 'pageNum',
            in: 'query',
            description: '页数',
            required: true,
            type: 'string',
            default: '10'
          },
          {
            name: 'pageSize',
            in: 'query',
            description: '数据条数',
            required: true,
            type: 'string',
            default: '1'
          },
          {
            name: 'status',
            in: 'query',
            description:
              '面试状态（待笔试（0）、笔试未通过（1）、待面试（2）、进入二面（3）、进入三面（4）、已录取（5）、面试未通过（6））',
            required: false,
            type: 'string'
          },
          {
            name: 'studentId',
            in: 'query',
            description: '学号',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/comment': {
      post: {
        tags: ['普通用户接口'],
        summary: '添加面评',
        operationId: 'addCommentUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'comment',
            in: 'query',
            description: '面评',
            required: true,
            type: 'string'
          },
          {
            name: 'id',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          },
          {
            name: 'level',
            in: 'query',
            description: '面试等级（一面 0  二面 1  三面 2）',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/interview': {
      post: {
        tags: ['普通用户接口'],
        summary: '设置面试官',
        operationId: 'setInterviewUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'intervieweeId',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          },
          {
            name: 'interviewerId',
            in: 'query',
            description: '面试官id',
            required: true,
            type: 'string'
          },
          {
            name: 'level',
            in: 'query',
            description: '面试等级（一面 0  二面 1  三面 2）',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/interviewee': {
      post: {
        tags: ['普通用户接口'],
        summary: '添加面试者信息',
        operationId: 'addIntervieweeInfoUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'claas',
            in: 'query',
            description: '班级',
            required: false,
            type: 'string'
          },
          {
            name: 'email',
            in: 'query',
            description: '邮箱',
            required: false,
            type: 'string'
          },
          {
            name: 'qqNumber',
            in: 'query',
            description: 'qq号',
            required: false,
            type: 'string'
          },
          {
            name: 'sex',
            in: 'query',
            description: '性别',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'studentId',
            in: 'query',
            description: '学号',
            required: false,
            type: 'string'
          },
          {
            name: 'username',
            in: 'query',
            description: '姓名',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      },
      delete: {
        tags: ['普通用户接口'],
        summary: '删除被面试者',
        operationId: 'deleteIntervieweesUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'ids',
            in: 'query',
            description: 'ids',
            required: true,
            type: 'array',
            items: {
              type: 'integer',
              format: 'int32'
            },
            collectionFormat: 'multi'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/interviewers': {
      get: {
        tags: ['普通用户接口'],
        summary: '所有面试官',
        operationId: 'interviewersUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'pageNum',
            in: 'query',
            description: 'pageNum',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'pageSize',
            in: 'query',
            description: 'pageSize',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'studentId',
            in: 'query',
            description: 'studentId',
            required: false,
            type: 'string'
          },
          {
            name: 'username',
            in: 'query',
            description: 'username',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/login': {
      post: {
        tags: ['普通用户接口'],
        summary: '登录',
        operationId: 'loginUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'password',
            in: 'query',
            description: '密码',
            required: true,
            type: 'string'
          },
          {
            name: 'studentId',
            in: 'query',
            description: '学号',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/password': {
      put: {
        tags: ['普通用户接口'],
        summary: '修改密码',
        operationId: 'updatePasswordUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'newPassword',
            in: 'query',
            description: '新密码',
            required: true,
            type: 'string'
          },
          {
            name: 'password',
            in: 'query',
            description: '密码',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/score': {
      get: {
        tags: ['普通用户接口'],
        summary: '计算面试分数',
        operationId: 'getScoreUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          },
          {
            name: 'level',
            in: 'query',
            description: '面试等级（一面 0  二面 1  三面 2）',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/setScore': {
      post: {
        tags: ['普通用户接口'],
        summary: '设置面试分数',
        operationId: 'setScoreUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'attitude',
            in: 'query',
            description: '态度（面试时的态度，包括回答问题或者礼貌问题）',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'communicationSkills',
            in: 'query',
            description: '沟通能力分',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'expressiveSkill',
            in: 'query',
            description: '表达能力',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'intervieweeId',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          },
          {
            name: 'know',
            in: 'query',
            description: '小组了解程度',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'level',
            in: 'query',
            description: '面试等级',
            required: true,
            type: 'string',
            default: '0'
          },
          {
            name: 'psychologicalQualities',
            in: 'query',
            description: '心理素质分',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'resilience',
            in: 'query',
            description: '应变能力',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'selfEvaluation',
            in: 'query',
            description: '自我评价',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'selfLearning',
            in: 'query',
            description: '自学能力',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'teamworkSkills',
            in: 'query',
            description: '团队合作能力',
            required: false,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'thinkingPersonality',
            in: 'query',
            description: '思维性格分数',
            required: false,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/status': {
      put: {
        tags: ['普通用户接口'],
        summary: '修改面试状态',
        operationId: 'updateStatusUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description:
              '面试状态（待笔试（0）、笔试未通过（1）、待面试（2）、进入二面（3）、进入三面（4）、已录取（5）、面试未通过（6））',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/updatePlaceAndTime': {
      put: {
        tags: ['普通用户接口'],
        summary: '更改面试地点以及时间',
        operationId: 'updatePlaceAndTimeUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: '面试者id',
            required: true,
            type: 'string'
          },
          {
            name: 'place',
            in: 'query',
            description: '面试地点',
            required: true,
            type: 'string'
          },
          {
            name: 'time',
            in: 'query',
            description: '面试时间(yyyy-MM-dd HH:mm)',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    },
    '/user/userInfo': {
      get: {
        tags: ['普通用户接口'],
        summary: '获取面试者信息',
        operationId: 'userInfoUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: '面试者id',
            required: false,
            type: 'string'
          },
          {
            name: 'studentId',
            in: 'query',
            description: '面试者学号',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'JsonResult',
              $ref: '#/definitions/JsonResult'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        security: [
          {
            token: ['global']
          }
        ],
        deprecated: false
      }
    }
  },
  'x-securityDefinitions': {
    token: {
      type: 'apiKey',
      name: 'token',
      in: 'header'
    }
  }
}
export const APIdateOpenApi = {
  swagger: '2.0',
  info: {
    description: '双选系统接口描述',
    version: 'v1.0',
    title: '双选开发文档',
    contact: {
      name: '清风',
      url: 'http://baidu.com',
      email: '1647078436@qq.com'
    }
  },
  host: '150.158.34.233:8080',
  basePath: '/',
  tags: [
    {
      name: '教师控制器',
      description: 'Teacher Controller'
    },
    {
      name: '用户控制器',
      description: 'Student Controller'
    },
    {
      name: '管理员控制器',
      description: 'Admin Controller'
    }
  ],
  paths: {
    '/admin/acceptTeacherApply': {
      post: {
        tags: ['管理员控制器'],
        summary: '批量通过老师的申请',
        operationId: 'acceptTeacherApplyUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: '老师id集合',
            description: 'list',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'ids',
            description: 'ids',
            required: true,
            schema: {
              type: 'array',
              items: {
                type: 'integer',
                format: 'int32'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/addDepartment': {
      post: {
        tags: ['管理员控制器'],
        summary: '添加专业或者部门',
        operationId: 'addDepartmentUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'department',
            description: 'department',
            required: true,
            schema: {
              originalRef: 'Department',
              $ref: '#/definitions/Department'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/addStudent': {
      post: {
        tags: ['管理员控制器'],
        summary: '添加学生',
        operationId: 'addStudentUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'student',
            description: 'student',
            required: true,
            schema: {
              originalRef: '学生类',
              $ref: '#/definitions/学生类'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/addTeacher': {
      post: {
        tags: ['管理员控制器'],
        summary: '添加老师',
        operationId: 'addTeacherUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'teacher',
            description: 'teacher',
            required: true,
            schema: {
              originalRef: '老师类',
              $ref: '#/definitions/老师类'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/adminGetCode': {
      get: {
        tags: ['管理员控制器'],
        summary: '管理员获取验证码',
        operationId: 'adminGetCodeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: '手机号',
            description: 'phone',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'phone',
            in: 'query',
            description: 'phone',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/bindPhone': {
      post: {
        tags: ['管理员控制器'],
        summary: '管理员绑定手机号',
        operationId: 'bindPhoneUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'code',
            description: '验证码',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'password',
            description: '用户密码',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'phone',
            description: '用户手机',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/deleteAll': {
      get: {
        tags: ['管理员控制器'],
        summary: '/清除数据',
        operationId: 'deleteAllUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/deleteDepartmentByIds': {
      post: {
        tags: ['管理员控制器'],
        summary: '通过id批量删除部门',
        operationId: 'deleteDepartmentByIdsUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: 'ids',
            required: true,
            schema: {
              type: 'array',
              items: {
                type: 'integer',
                format: 'int32'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/deleteNoticeByIds': {
      post: {
        tags: ['管理员控制器'],
        summary: '根据id批量删除公告',
        operationId: 'deleteNoticeByIdsUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: 'ids',
            required: true,
            schema: {
              type: 'array',
              items: {
                type: 'integer',
                format: 'int32'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/deleteStudents': {
      post: {
        tags: ['管理员控制器'],
        summary: '批量删除学生',
        operationId: 'deleteStudentsUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: '学生id集合',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/deleteTeachers': {
      post: {
        tags: ['管理员控制器'],
        summary: '批量删除老师',
        operationId: 'deleteTeachersUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: '老师id集合',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/exportAllSelectResult': {
      get: {
        tags: ['管理员控制器'],
        summary: '导出双选结果',
        operationId: 'exportUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/exportAllStudent': {
      get: {
        tags: ['管理员控制器'],
        summary: '导出所有学生',
        operationId: 'exportAllStudentUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/exportAllTeacher': {
      get: {
        tags: ['管理员控制器'],
        summary: '导出所有老师',
        operationId: 'exportAllTeacherUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/exportStudent': {
      get: {
        tags: ['管理员控制器'],
        summary: '导出未匹配学生',
        operationId: 'exportStudentUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findAllNotice': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询所有公告',
        operationId: 'findAllNoticeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findAllStudentNumber': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询所有学生数量',
        operationId: 'findAllStudentNumberUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findAllTeacherPassNumber': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询所有老师申请数量',
        operationId: 'findAllTeacherPassNumberUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findDepartment': {
      post: {
        tags: ['管理员控制器'],
        summary: '查询专业',
        operationId: 'findDepartmentUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'department',
            description: 'department',
            required: true,
            schema: {
              originalRef: 'Department',
              $ref: '#/definitions/Department'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findMateStudents/{id}/{size}/{page}': {
      get: {
        tags: ['管理员控制器'],
        summary: '根据id查询选择该老师的学生',
        operationId: 'findMateStudentsUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findSelectResultTeacher/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询所有老师选课信息',
        operationId: 'findSelectResultTeacherUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findStudentLike/{keyword}/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '模糊查询学生',
        operationId: 'findStudentLikeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'keyword',
            in: 'path',
            description: 'keyword',
            required: true,
            type: 'string'
          },
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findStudentNotAcceptLike/{keyword}/{size}/{page}': {
      get: {
        tags: ['管理员控制器'],
        summary: '模糊查询未匹配的学生',
        operationId: 'findStudentNotAcceptLikeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'keyword',
            in: 'path',
            description: 'keyword',
            required: true,
            type: 'string'
          },
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findStudentNotSelect/{size}/{page}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询未匹配的学生',
        operationId: 'findStudentNotSelectUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findStudents/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询所有学生',
        operationId: 'findStudentsUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'size',
            in: 'path',
            description: '每页数量',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherAcceptLike/{keyword}/{size}/{page}': {
      get: {
        tags: ['管理员控制器'],
        summary: '模糊查询所有选课的老师',
        operationId: 'findTeacherAcceptLikeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'keyword',
            in: 'path',
            description: 'keyword',
            required: true,
            type: 'string'
          },
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherById/{id}': {
      get: {
        tags: ['管理员控制器'],
        summary: '根据id查询老师信息',
        operationId: 'findTeacherByIdUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherFinish/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询选课完成老师',
        operationId: 'findTeacherFinishUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherLike/{keyword}/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '模糊查询老师',
        operationId: 'findTeacherLikeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'keyword',
            in: 'path',
            description: 'keyword',
            required: true,
            type: 'string'
          },
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherNeedLike/{keyword}/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '模糊查询需要审核的老师',
        operationId: 'findTeacherNeedLikeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'keyword',
            in: 'path',
            description: 'keyword',
            required: true,
            type: 'string'
          },
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherNotPass/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询需要审核的老师',
        operationId: 'findTeacherNotPassUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeacherUnFinish/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询选课未完成老师',
        operationId: 'findTeacherUnFinishUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: 'page',
            required: true,
            type: 'integer',
            format: 'int32'
          },
          {
            name: 'size',
            in: 'path',
            description: 'size',
            required: true,
            type: 'integer',
            format: 'int32'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/findTeachers/{page}/{size}': {
      get: {
        tags: ['管理员控制器'],
        summary: '查询所有老师',
        operationId: 'findTeachersUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'page',
            in: 'path',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'size',
            in: 'path',
            description: '每页数量',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/initializeStudentPassword': {
      put: {
        tags: ['管理员控制器'],
        summary: '批量初始化学生密码',
        operationId: 'initializePasswordUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: '学生id集合',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/initializeTeacherPassword': {
      put: {
        tags: ['管理员控制器'],
        summary: '批量初始化老师密码',
        operationId: 'initializeTeacherPasswordUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: 'ids',
            required: true,
            schema: {
              type: 'array',
              items: {
                type: 'integer',
                format: 'int32'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/insertStudents': {
      post: {
        tags: ['管理员控制器'],
        summary: '批量导入学生信息',
        operationId: 'insertsStudentsUsingPOST',
        consumes: ['multipart/form-data'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'file',
            in: 'formData',
            description: 'file',
            required: true,
            type: 'file'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/insertTeachers': {
      post: {
        tags: ['管理员控制器'],
        summary: '批量导入老师信息',
        operationId: 'insertsTeachersUsingPOST',
        consumes: ['multipart/form-data'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'file',
            in: 'formData',
            description: 'file',
            required: true,
            type: 'file'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/notAcceptTeaApp': {
      post: {
        tags: ['管理员控制器'],
        summary: '拒绝老师的申请名额',
        operationId: 'notAcceptTeacherApplyUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'ids',
            description: 'ids',
            required: true,
            schema: {
              type: 'array',
              items: {
                type: 'integer',
                format: 'int32'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/notAcceptTeacher': {
      post: {
        tags: ['管理员控制器'],
        summary: '拒绝单个老师',
        operationId: 'notAcceptTeacherUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'message',
            description: 'message',
            required: true,
            schema: {
              originalRef: 'Message',
              $ref: '#/definitions/Message'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/setNotice': {
      get: {
        tags: ['管理员控制器'],
        summary: '设置公告',
        operationId: 'setNoticeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: '公告内容',
            description: 'content',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'content',
            in: 'query',
            description: 'content',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/setStudentSelectTime': {
      post: {
        tags: ['管理员控制器'],
        summary: '设置学生选择时间',
        operationId: 'setStudentSelectTimeUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'selectTime',
            description: 'selectTime',
            required: true,
            schema: {
              originalRef: '选课时间',
              $ref: '#/definitions/选课时间'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/setTeacherSelectTime': {
      post: {
        tags: ['管理员控制器'],
        summary: '设置老师选课时间',
        operationId: 'setTeacherSelectTimeUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'selectTime',
            description: 'selectTime',
            required: true,
            schema: {
              originalRef: '选课时间',
              $ref: '#/definitions/选课时间'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/setTimeBySystem': {
      post: {
        tags: ['管理员控制器'],
        summary: '智能设置时间',
        operationId: 'setTimeBySystemUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'continueTime',
            description: '每轮持续时间',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'date',
            description: '开始时间',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'interval',
            description: '每轮间隔时间',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/updateSelectTime': {
      put: {
        tags: ['管理员控制器'],
        summary: '修改选课时间',
        operationId: 'updateSelectTimeUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'selectTime',
            description: 'selectTime',
            required: true,
            schema: {
              originalRef: '选课时间',
              $ref: '#/definitions/选课时间'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/updateStudent': {
      put: {
        tags: ['管理员控制器'],
        summary: '修改学生信息',
        operationId: 'updateStudentUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'student',
            description: 'student',
            required: true,
            schema: {
              originalRef: '学生类',
              $ref: '#/definitions/学生类'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/updateTeacher': {
      put: {
        tags: ['管理员控制器'],
        summary: '修改老师信息',
        operationId: 'updateTeacherUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'teacher',
            description: 'teacher',
            required: true,
            schema: {
              originalRef: '老师类',
              $ref: '#/definitions/老师类'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/admin/updateTeacherApplyNumber/{id}/{number}': {
      put: {
        tags: ['管理员控制器'],
        summary: '修改老师申请名额',
        operationId: 'updateTeaAppNumUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: '老师id',
            required: true,
            type: 'string'
          },
          {
            name: 'number',
            in: 'path',
            description: '修改的数量',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/deleteMsg': {
      delete: {
        tags: ['用户控制器'],
        summary: '删除消息',
        operationId: 'deleteMsgUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'messageId',
            in: 'query',
            description: '消息的id',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        deprecated: false
      }
    },
    '/student/determine': {
      get: {
        tags: ['用户控制器'],
        summary: '判断是否出结果',
        operationId: 'determineUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/findPassword': {
      post: {
        tags: ['用户控制器'],
        summary: '找回密码',
        operationId: 'findPasswordUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'code',
            description: '验证码',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'password',
            description: '用户密码',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'phone',
            description: '用户手机',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getAllSelectTime': {
      get: {
        tags: ['用户控制器'],
        summary: '查看三轮选择时间',
        operationId: 'getAllSelectTimeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getAlreadyReadMessage': {
      get: {
        tags: ['用户控制器'],
        summary: '查看已读消息',
        operationId: 'getAlreadyReadMessageUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getCode': {
      get: {
        tags: ['用户控制器'],
        summary: '获取验证码',
        operationId: 'getCodeUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'phone',
            in: 'query',
            description: '电话',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getNotReadMessage': {
      get: {
        tags: ['用户控制器'],
        summary: '查看未读消息',
        operationId: 'getNotReadMessageUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getNotice': {
      get: {
        tags: ['用户控制器'],
        summary: '查看公告',
        operationId: 'getNoticeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getResetPasswordCode': {
      get: {
        tags: ['用户控制器'],
        summary: '获取修改密码验证码',
        operationId: 'getResetPasswordCodeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getResetPhoneCode': {
      get: {
        tags: ['用户控制器'],
        summary: '获取修改手机验证码',
        operationId: 'getResetPhoneCodeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getResult': {
      get: {
        tags: ['用户控制器'],
        summary: '查看双选结果',
        operationId: 'getResultUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getSelectTime': {
      get: {
        tags: ['用户控制器'],
        summary: '查看选择时间',
        operationId: 'getSelectTimeUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/getTeachers/{currentPage}/{rows}': {
      get: {
        tags: ['用户控制器'],
        summary: '查看老师',
        operationId: 'getTeachersUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'currentPage',
            in: 'path',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'rows',
            in: 'path',
            description: '每页的行数',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/login': {
      post: {
        tags: ['用户控制器'],
        summary: '用户登录',
        operationId: 'loginUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'user',
            description: 'user',
            required: true,
            schema: {
              originalRef: 'User',
              $ref: '#/definitions/User'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/logout': {
      get: {
        tags: ['用户控制器'],
        summary: '退出登录',
        operationId: 'logoutUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/queryPersonalInformation': {
      get: {
        tags: ['用户控制器'],
        summary: '查看个人信息',
        operationId: 'queryPersonalInformationUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/querySelectedTeacherId': {
      get: {
        tags: ['用户控制器'],
        summary: '查询选择老师的id',
        operationId: 'querySelectedTeacherIdUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/queryTeacher': {
      get: {
        tags: ['用户控制器'],
        summary: '查询老师',
        operationId: 'getCurseUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'condition',
            in: 'query',
            description: '查询的条件',
            required: false,
            type: 'string'
          },
          {
            name: 'currentPage',
            in: 'query',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'rows',
            in: 'query',
            description: '每页的行数',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/queryTeacherInfo/{teacherId}': {
      get: {
        tags: ['用户控制器'],
        summary: '查看老师详细信息',
        operationId: 'getTeacherUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'teacherId',
            in: 'path',
            description: '教师的id',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/readMessage': {
      post: {
        tags: ['用户控制器'],
        summary: '已读消息',
        operationId: 'readMessageUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'list',
            description: '消息集合id',
            required: false,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/selectCourse': {
      post: {
        tags: ['用户控制器'],
        summary: '选老师',
        operationId: 'selectCourseUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'teacherId',
            description: '教师id',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'param',
            description: 'param',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'integer',
                format: 'int32'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/updatePassword': {
      put: {
        tags: ['用户控制器'],
        summary: '修改学生密码',
        operationId: 'updateStudentPasswordUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'code',
            description: '验证码',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'newPassword',
            description: '新密码',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/student/updateStudentInfo': {
      put: {
        tags: ['用户控制器'],
        summary: '修改用户手机号',
        operationId: 'updateStudentUsingPUT_1',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'code',
            description: '验证码',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'newPhone',
            description: '新手机号',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/deleteMsg': {
      delete: {
        tags: ['教师控制器'],
        summary: '删除消息',
        operationId: 'deleteMsgUsingDELETE_1',
        produces: ['*/*'],
        parameters: [
          {
            name: 'messageId',
            in: 'query',
            description: '消息的id',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '204': {
            description: 'No Content'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getAllResult': {
      get: {
        tags: ['教师控制器'],
        summary: '所有双选结果',
        operationId: 'getResultUsingGET_1',
        produces: ['*/*'],
        parameters: [
          {
            name: 'currentPage',
            in: 'query',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'rows',
            in: 'query',
            description: '每页的行数',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getAllSelectTime': {
      get: {
        tags: ['教师控制器'],
        summary: '查看选择时间',
        operationId: 'getAllSelectTimeUsingGET_1',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getAlreadyReadMessage': {
      get: {
        tags: ['教师控制器'],
        summary: '查看已读消息',
        operationId: 'getAlreadyReadMessageUsingGET_1',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getNotReadMessage': {
      get: {
        tags: ['教师控制器'],
        summary: '查看未读消息',
        operationId: 'getNotReadMessageUsingGET_1',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getNotice': {
      get: {
        tags: ['教师控制器'],
        summary: '查看公告',
        operationId: 'getNoticeUsingGET_1',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getResult': {
      get: {
        tags: ['教师控制器'],
        summary: '双选结果',
        operationId: 'getResultUsingGET_2',
        produces: ['*/*'],
        parameters: [
          {
            name: 'condition',
            in: 'query',
            description: '查询的条件',
            required: false,
            type: 'string'
          },
          {
            name: 'currentPage',
            in: 'query',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'rows',
            in: 'query',
            description: '每页的行数',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getStudentInfo': {
      get: {
        tags: ['教师控制器'],
        summary: '查看学生信息',
        operationId: 'getStudentUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'studentId',
            in: 'query',
            description: '学生id',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getStudents': {
      get: {
        tags: ['教师控制器'],
        summary: '查看学生',
        operationId: 'getStudentsUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'currentPage',
            in: 'query',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'rows',
            in: 'query',
            description: '每页的行数',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/getThisRoundsQuota': {
      get: {
        tags: ['教师控制器'],
        summary: '查看本轮剩余名额',
        operationId: 'getThisRoundsQuotaUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/matching': {
      get: {
        tags: ['教师控制器'],
        summary: '第三轮自动匹配',
        operationId: 'matchingUsingGET',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/queryPersonalInfo': {
      get: {
        tags: ['教师控制器'],
        summary: '查看个人详细信息',
        operationId: 'getTeacherUsingGET_1',
        produces: ['*/*'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/queryStudent': {
      get: {
        tags: ['教师控制器'],
        summary: '查询学生',
        operationId: 'queryStudentUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'condition',
            in: 'query',
            description: '查询的条件',
            required: false,
            type: 'string'
          },
          {
            name: 'currentPage',
            in: 'query',
            description: '当前页数',
            required: true,
            type: 'string'
          },
          {
            name: 'rows',
            in: 'query',
            description: '每页的行数',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/readMessage': {
      post: {
        tags: ['教师控制器'],
        summary: '已读消息',
        operationId: 'readMessageUsingPOST_1',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'list',
            description: '消息集合id',
            required: false,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/selectStudents': {
      post: {
        tags: ['教师控制器'],
        summary: '选择学生',
        operationId: 'selectStudentUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'list',
            description: '要选择学生的集合',
            required: false,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/submitQuota/{quota}': {
      get: {
        tags: ['教师控制器'],
        summary: '提交审核名额',
        operationId: 'submitQuotaUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'quota',
            in: 'path',
            description: '提交的数量',
            required: false,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/updateTeacherInfo': {
      put: {
        tags: ['教师控制器'],
        summary: '修改老师个人信息',
        operationId: 'updateTeacherUsingPUT_1',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'teacher',
            description: 'teacher',
            required: true,
            schema: {
              originalRef: '老师类',
              $ref: '#/definitions/老师类'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/updateTeacherPassword': {
      put: {
        tags: ['教师控制器'],
        summary: '修改老师密码',
        operationId: 'updateTeacherPasswordUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'code',
            description: '验证码',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'newPassword',
            description: '新密码',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    },
    '/teacher/updateTeacherPhone': {
      put: {
        tags: ['教师控制器'],
        summary: '修改老师手机号',
        operationId: 'updateTeacherPhoneUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'code',
            description: '验证码',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'newPhone',
            description: '新手机号',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            in: 'body',
            name: 'map',
            description: 'map',
            required: true,
            schema: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              }
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        responsesObject: {
          '200': {
            description: 'OK',
            schema: {
              originalRef: 'Result',
              $ref: '#/definitions/Result'
            }
          },
          '201': {
            description: 'Created'
          },
          '401': {
            description: 'Unauthorized'
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'Not Found'
          }
        },
        deprecated: false
      }
    }
  },
  definitions: {
    Department: {
      type: 'object',
      properties: {
        departmentName: {
          type: 'string',
          refType: null
        },
        id: {
          type: 'integer',
          format: 'int32',
          refType: null
        },
        role: {
          type: 'string',
          refType: null
        },
        type: {
          type: 'string',
          refType: null
        }
      },
      title: 'Department'
    },
    Message: {
      type: 'object',
      properties: {
        content: {
          type: 'string'
        },
        date: {
          originalRef: 'Timestamp',
          $ref: '#/definitions/Timestamp'
        },
        id: {
          type: 'integer',
          format: 'int32'
        },
        read: {
          type: 'boolean'
        },
        userId: {
          type: 'integer',
          format: 'int32'
        }
      },
      title: 'Message'
    },
    Result: {
      type: 'object',
      properties: {
        code: {
          type: 'integer',
          format: 'int32'
        },
        data: {
          type: 'object'
        },
        message: {
          type: 'string'
        }
      },
      title: 'Result'
    },
    Timestamp: {
      type: 'object',
      properties: {
        date: {
          type: 'integer',
          format: 'int32'
        },
        hours: {
          type: 'integer',
          format: 'int32'
        },
        minutes: {
          type: 'integer',
          format: 'int32'
        },
        month: {
          type: 'integer',
          format: 'int32'
        },
        nanos: {
          type: 'integer',
          format: 'int32'
        },
        seconds: {
          type: 'integer',
          format: 'int32'
        },
        time: {
          type: 'integer',
          format: 'int64'
        },
        year: {
          type: 'integer',
          format: 'int32'
        }
      },
      title: 'Timestamp'
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32'
        },
        password: {
          type: 'string'
        },
        role: {
          type: 'string'
        },
        username: {
          type: 'string'
        }
      },
      title: 'User'
    },
    学生类: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: '学生班级'
        },
        id: {
          type: 'integer',
          format: 'int32',
          description: '学生id'
        },
        major: {
          type: 'string',
          description: '学生专业方向'
        },
        name: {
          type: 'string',
          description: '学生姓名'
        },
        number: {
          type: 'string',
          description: '学生学号'
        },
        password: {
          type: 'string',
          description: '学生密码'
        },
        phone: {
          type: 'string',
          description: '学生手机号'
        },
        role: {
          type: 'string',
          description: '身份'
        },
        selected: {
          type: 'boolean'
        },
        sex: {
          type: 'string',
          description: '学生性别'
        }
      },
      title: '学生类'
    },
    老师类: {
      type: 'object',
      properties: {
        applicationNumber: {
          type: 'integer',
          format: 'int32',
          description: '老师申报名额',
          refType: null
        },
        department: {
          type: 'string',
          description: '院系',
          refType: null
        },
        id: {
          type: 'integer',
          format: 'int32',
          description: '老师id',
          refType: null
        },
        major: {
          type: 'string',
          description: '老师专业方向',
          refType: null
        },
        name: {
          type: 'string',
          description: '老师姓名',
          refType: null
        },
        number: {
          type: 'string',
          description: '老师工号',
          refType: null
        },
        pass: {
          type: 'boolean',
          refType: null
        },
        password: {
          type: 'string',
          description: '老师密码',
          refType: null
        },
        phone: {
          type: 'string',
          description: '老师手机号',
          refType: null
        },
        role: {
          type: 'string',
          description: '权限',
          refType: null
        },
        selectNumber: {
          type: 'integer',
          format: 'int32',
          description: '老师已选人数',
          refType: null
        },
        sex: {
          type: 'string',
          description: '老师性别',
          refType: null
        },
        theSelectedNumber: {
          type: 'integer',
          format: 'int32',
          refType: null
        }
      },
      title: '老师类'
    },
    选课时间: {
      type: 'object',
      properties: {
        endTime: {
          type: 'string',
          format: 'date-time'
        },
        number: {
          type: 'integer',
          format: 'int32'
        },
        role: {
          type: 'string'
        },
        startTime: {
          type: 'string',
          format: 'date-time'
        }
      },
      title: '选课时间'
    }
  }
}
