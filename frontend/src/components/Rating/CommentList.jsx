import { useTranslation } from 'react-i18next'; 

const CommentList = ({ comment }) => {
  const { t } = useTranslation(); 
  return (
    <div className="mt-8">
      <div className="mb-4 p-4 bg-white border rounded shadow w-full max-w-lg mx-auto">
        <p>
          <strong>{t('ratingComments.rating')}:</strong> {comment.rating}
        </p>
        <p>
          <strong>{t('ratingComments.comment')}:</strong> {comment.comment}
        </p>
        <p>
          <strong>{t('ratingComments.user')}:</strong> {comment.username}
        </p>
        <p>
          <strong>{t('ratingComments.date')}:</strong>{' '}
          {new Date(comment.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CommentList;
