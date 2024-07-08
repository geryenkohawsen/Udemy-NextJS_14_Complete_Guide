const names = ['Geryenko', 'Hawsen'];

function Post() {
  // chosenName is recalculated every time the Post component renders
  const chosenName = Math.random() > 0.5 ? names[0] : names[1];

  return (
    <div>
      <p>{chosenName}</p>
      <p>React Refresher</p>
    </div>
  );
}

export default Post;
