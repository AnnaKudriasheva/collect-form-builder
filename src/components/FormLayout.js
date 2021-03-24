import React, { useContext } from 'react';
import { Button, Row, Col } from '@vgs/elemente';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Icon, { PlusOutlined, SelectOutlined } from '@ant-design/icons';

import DeleteIcon from '../images/delete.svg';
import DragDropIcon from '../images/drag-drop.svg';
import { FormContext } from '../context/form-context';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: '12px 0',
  background: "transparent",
  ...draggableStyle
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const FormLayout = () => {
  const [state, dispatch] = useContext(FormContext);

  const handleItemEdit = (id) => {
    dispatch({
      type: "SET_MODE",
      payload: "edit",
    });
    dispatch({
      type: "SET_ACTIVE_FIELD",
      payload: state.form.find(item => item.id === id),
    });
  }

  const handleItemAdd = () => {
    dispatch({
      type: "SET_MODE",
      payload: "create",
    });
  }

  const handleItemRemove = (id) => {
    dispatch({
      type: "REMOVE_FIELD",
      payload: id,
    });
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      state.form,
      result.source.index,
      result.destination.index
    );
    dispatch({
      type: "UPDATE_FIELDS_ORDER",
      payload: items,
    });
  }

  return (
    <div className="create-fields-container">
      <Row gutter={16}>
        <Col span={12}>
          <div onClick={() => dispatch({type: 'SET_TEMPLATES_DRAWER', payload: true})} className={`field-layout d-flex j-space-between align-center add-new-field-btn mb-2`}>
            <span>Choose from template</span>
            <SelectOutlined style={{ fontSize: '24px'}}/>
          </div>
        </Col>
        <Col span={12}>
          <div onClick={handleItemAdd} className={`field-layout d-flex j-space-between align-center add-new-field-btn mb-2 ${state.mode === 'create' ? 'outlined' : ''}`}>
            <span>Add new field</span>
            <PlusOutlined style={{ fontSize: '24px'}}/>
          </div>
        </Col>

      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.form.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Row type="flex" align="middle">
                        <Col span={2}>
                          <Icon component={DragDropIcon} style={{ fontSize: '24px'}}/>
                        </Col>
                        <Col span={22}>
                          <div className={`field-layout ${state.mode === 'edit' && item.id === state.currentActiveField.id ? 'outlined' : ''}`}>
                            <Row type="flex" align="middle">
                              <Col span={20}>
                                {item.name}
                              </Col>
                              <Col span={4}>
                                <Row type="flex">
                                  <Col span={12}>
                                    <Button className="p-0" onClick={() => handleItemEdit(item.id)} type="link">Edit</Button>
                                  </Col>
                                  <Col span={12}>
                                    <Button className="p-0" onClick={() => handleItemRemove(item.id)} type="link">
                                      <Icon component={DeleteIcon} style={{ color: 'transparent' }}/>
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                           </div>
                          </Col>
                      </Row>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default FormLayout;
