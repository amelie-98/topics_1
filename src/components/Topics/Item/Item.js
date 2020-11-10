import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import {
  CommentOutlined,
  DownloadOutlined,
  StarOutlined,
  UserOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Wrapper from './Item.styled';
import Icon from './Icon';
import { addComment, careTopics } from '../../../actions';

const Item = ({ topic, addComment, careTopics, isDetail }) => {
  const [showComment, setShowComment] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const formik = useFormik({
    initialValues: { content: '', image: null, video: null, outline: null },
    validationSchema: Yup.object({
      content: Yup.string().required('hãy nhập comment'),
    }),
    onSubmit: async values => {
      addComment({
        ...values,
        id_author_comment: currentUser._id,
        id_thread: topic.id,
      });
    },
  });

  const handlecareTopics = topic => {
    const careList = currentUser.care;

    const indexTopicInCareList = careList.findIndex(item => item.id === topic.id);

    if (indexTopicInCareList === -1) {
      careList.push({ ...topic });
      careTopics(careList);
      return;
    }

    const careListAfterFilter = careList.filter(item => item.id !== topic.id);
    careTopics(careListAfterFilter);
  };

  const shouldShowComment = useMemo(() => {
    if (isDetail) return true;
    return showComment;
  }, [isDetail, showComment]);

  useEffect(() => {
    if (isDetail) {
      const detailComment = document.querySelector("[class='detail-comment comment']");
      detailComment && detailComment.scrollTo({ top: 9999999999 });
    }
  }, [isDetail]);

  const diffUpdate = useCallback(item => {
    const diffDayUpdate = moment().diff(moment(item.date_create), 'days');
    const diffHourUpdate = moment().diff(moment(item.date_create), 'hours');
    const diffMinuteUpdate = moment().diff(moment(item.date_create), 'minutes');
    const diffSecondUpdate = moment().diff(moment(item.date_create), 'seconds');

    if (diffDayUpdate) return `${diffDayUpdate} ngày trước`;
    if (diffHourUpdate) return `${diffHourUpdate} giờ trước`;
    if (diffMinuteUpdate) return `${diffMinuteUpdate} phút trước`;
    if (!diffSecondUpdate) return `vừa xong`;
    return `${diffSecondUpdate} giây trước`;
  }, []);

  return (
    <Wrapper>
      <div className="header">
        <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
        <div className="info">
          <p className="left-info">
            {topic.author.name}
            <span>đã đăng một chủ đề thảo luận</span>
          </p>
          <div className="right-info">
            <span>{diffUpdate(topic)} ,</span>
            <span className="role">
              {topic.author.role === 'admin' ? (
                <span>
                  Quản trị viên
                  <StarOutlined />
                </span>
              ) : (
                <span>
                  Học Viên
                  <UserOutlined />
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="content">
        <p>{topic.content}</p>
        {topic.image && <img src={topic.image} alt="img-content" />}
        {topic.video && <video src={topic.video} alt="video-content" controls />}
        {topic.outline && (
          <div className="download">
            <DownloadOutlined />
            <a href={topic.outline}> Nhấn Vào Đây Để Tải Tệp Đính Kèm</a>
          </div>
        )}
      </div>

      <div className="action">
        <div
          className="action-care"
          style={currentUser.care.findIndex(item => item.id === topic.id) !== -1 ? { color: '#e36436' } : {}}
          onClick={() => handlecareTopics(topic)}
        >
          <HeartOutlined />
          Quan Tâm
        </div>
        <div
          className="action-comment"
          style={!!showComment ? { color: '#e36436' } : {}}
          onClick={() => setShowComment(!showComment)}
        >
          <CommentOutlined />
          Comment
        </div>
      </div>

      {shouldShowComment && topic.comment && !!topic.comment.length && (
        <div
          id="id-comment"
          className={`${isDetail ? 'detail-comment' : ''} comment`}
          style={showComment ? { borderTop: '1px solid #e7e9ec' } : { borderTop: 'none' }}
        >
          {topic.comment.map((comment, index) => (
            <div
              className="each-comment"
              key={index}
              style={index === 0 ? { borderTop: 'none' } : { borderTop: '1px solid #e7e9ec' }}
            >
              <div className="header">
                <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
                <div className="info">
                  <p className="left-info">{comment.author_comment.name}</p>
                  <div className="right-info">
                    <span>{diffUpdate(comment)} ,</span>
                    <span>{comment.author_comment.role === 'admin' ? 'quản trị viên' : 'người dùng'}</span>
                  </div>
                </div>
              </div>

              <div className="content">
                <p>{comment.content}</p>
                {comment.image && <img src={comment.image} alt="img-content" />}
                {comment.video && <video src={comment.video} alt="video-content" controls />}
                {comment.outline && (
                  <div className="download">
                    <DownloadOutlined />
                    <a href={comment.outline}> Nhấn Vào Đây Để Tải Tài Liệu Đính Kèm</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="write-comment">
          <div className="header">
            <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
            <div className="info">
              <div className="right-info">
                <textarea
                  name="content"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                />
                <div className="upload">
                  <div className="wrapper-field-upload">
                    <label htmlFor="image-input">
                      <FileImageOutlined />
                    </label>
                    <input
                      type="file"
                      id="image-input"
                      accept="image/*"
                      name="image"
                      onChange={event => formik.setFieldValue('image', event.target.files[0])}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="wrapper-field-upload">
                    <label htmlFor="video-input">
                      <VideoCameraOutlined />
                    </label>
                    <input
                      type="file"
                      id="video-input"
                      accept="video/mp4,video/x-m4v,video/*"
                      name="video"
                      onChange={event => formik.setFieldValue('video', event.target.files[0])}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="wrapper-field-upload">
                    <label htmlFor="outline-input">
                      <FileTextOutlined />
                    </label>
                    <input
                      type="file"
                      id="outline-input"
                      name="outline"
                      onChange={event => formik.setFieldValue('outline', event.target.files[0])}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <Icon addEmoji={item => formik.setFieldValue('content', `${formik.values.content}${item}`)} />
                </div>

                <div className="submit-comment">
                  <button className="post" type="submit">
                    Đăng Tải
                  </button>
                  <button className="cancel">Hủy Bỏ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const mapStatetoProps = ({ reRender }) => {
  return { reRender };
};
const mapDispatchToProps = dispatch => {
  return {
    addComment: data => dispatch(addComment(data)),
    careTopics: data => dispatch(careTopics(data)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Item);
