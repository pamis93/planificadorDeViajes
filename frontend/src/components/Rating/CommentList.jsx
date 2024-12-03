import { useTranslation } from 'react-i18next'; // Importamos el hook de traducción

const CommentList = ({ comment }) => {
  const { t } = useTranslation(); // Hook para acceder a las traducciones

  return (
    <div className="mt-8">
      <div className="mb-4 p-4 bg-white border rounded shadow w-full max-w-lg mx-auto">
        <p>
          <strong>{t('rating')}:</strong> {comment.rating}
        </p>
        <p>
          <strong>{t('comment')}:</strong> {comment.comment}
        </p>
        <p>
          <strong>{t('user')}:</strong> {comment.username}
        </p>
        <p>
          <strong>{t('date')}:</strong>{' '}
          {new Date(comment.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CommentList;
