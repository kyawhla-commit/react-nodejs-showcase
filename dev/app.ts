let a: number;
a = 123;

function add(a: number, b: number) {
    return a + b;
}

type Student = {
    roll: number;
    name: string;
}

let eve: Student & { grage: [] };

function hello(obj: { msg: string, code: number }) {
    //
}

type Res<T> = {
  data: T;
  status: number;
}

type Post = {
  title: string;
  body: string;
}

type Category = {
    name: string;
}

const post: Res<Post> = {
  data: { title: 'Some title', body: '…' },
  status: 200,
};

const cat: Res<Category> = {
    data: { name: "Tech" },
    status: 200
}
