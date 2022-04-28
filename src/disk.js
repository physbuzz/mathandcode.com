	


var x=0;
var y=0;
var phi=1;
var psi=1;
var theta=1;
var dphi=0;
var dtheta=1;
var dpsi=1;
var r=1;
var g=1;

var ddtheta=function(){
	return 2*dpsi*dphi/Math.sin(phi);
};
var ddphi=function(){
	return -4*g*Math.cos(phi)/(5.0*r)-1.0/5.0*dtheta*Math.sin(phi)*(5*dtheta*Math.cos(phi)+6*dpsi);
};
var ddpsi=function(){
	return dphi*(5/3.0*dtheta*Math.sin(phi)-2*dpsi*Math.cos(phi)/Math.sin(phi));
};
var dx=function(){
	return -dphi*r*Math.cos(theta)*Math.sin(phi)-dpsi*r*Math.sin(theta)-dtheta*r*Math.cos(phi)*Math.sin(theta);
};		
var dy=function(){
	return r*dpsi*Math.cos(theta)+dtheta*Math.cos(phi)*Math.cos(theta)-dphi*Math.sin(phi)*Math.sin(theta);
};


var paneWidth=400;
var paneHeight=400;
var elementID="drawdiv";
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, paneWidth/paneHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor( 0xffffff, 1);
renderer.setSize( paneWidth,paneHeight);
document.getElementById(elementID).appendChild( renderer.domElement );


var cgeometry2 = new THREE.CylinderGeometry( 0.13,0.13, r, 10 );
var cmaterial2 = new THREE.MeshLambertMaterial( {color: 0xFF0000,shading:THREE.FlatShading} );
var cylinder2 = new THREE.Mesh( cgeometry2, cmaterial2 );
scene.add(cylinder2);
/*
var cgeometry3 = new THREE.CylinderGeometry( r,r, 0.1, 10 );
var cmaterial3 = new THREE.MeshLambertMaterial( {color: 0x000000,shading:THREE.FlatShading} );
var cylinder3 = new THREE.Mesh( cgeometry3, cmaterial3 );
scene.add(cylinder3);
*/


var cgeometry = new THREE.CylinderGeometry( r,r, 0.1, 10 );
var cmaterial = new THREE.MeshLambertMaterial( {color: 0xaaaaaa,shading:THREE.FlatShading} );
var cylinder = new THREE.Mesh( cgeometry, cmaterial );
scene.add(cylinder);

var geometry = new THREE.PlaneGeometry( 15,15,20,20 );
var material = new THREE.MeshLambertMaterial( {color: 0xffff00, shading:THREE.FlatShading,side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material,20,20 );
plane.applyMatrix((new THREE.Matrix4()).makeRotationX(3.141592/2));
scene.add( plane );


var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.3 );
var directionalLight2 = new THREE.PointLight( 0xffffff, 0.5 );
directionalLight1.position.set( 1, 3, 0 );
directionalLight2.position.set( 0, 3, 0 );
scene.add( directionalLight1 );
scene.add( directionalLight2 );
camera.position.z=10;
camera.position.y=5;
camera.lookAt(new THREE.Vector3(0,0,0));

var controls = new THREE.TrackballControls( camera, renderer.domElement );
			controls.minDistance = 10;
			controls.maxDistance = 20;


var positionCylinder=function(){
	cylinder.position.x=0;
	cylinder.position.y=0;
	cylinder.position.z=0;
	cylinder.rotation.x=0;
	cylinder.rotation.y=0;
	cylinder.rotation.z=0;
	var m=new THREE.Matrix4();
	var m1=new THREE.Matrix4();
	var m2=new THREE.Matrix4();
	var m3=new THREE.Matrix4();
	m1.makeRotationY(-theta);
	m2.makeRotationZ(phi);
	m3.makeRotationY(-psi);
	m.makeTranslation(x,r*Math.sin(phi),y);
	m.multiply(m1);
	m.multiply(m2);
	m.multiply(m3);
	cylinder.matrix.copy((new THREE.Matrix4()));
	cylinder.applyMatrix(m);
	cylinder2.matrix.copy(((new THREE.Matrix4()).makeTranslation(0,r/2,0)));
	cylinder2.applyMatrix((new THREE.Matrix4()).makeRotationZ(3.141592/2.0));
	cylinder2.applyMatrix(m);
/*
	cylinder3.matrix.copy(new THREE.Matrix4());
	cylinder3.applyMatrix(m);
	cylinder3.applyMatrix((new THREE.Matrix4()).makeScale(1,0.05,1,1));*/
	//cylinder3.position.y=0.01;
/*transformationList[x_, y_, \[Theta]_, \[Phi]_, \[Psi]_, r_] := 
  TranslationTransform[{x, y, 
     r Sin[\[Phi]]}].RotationTransform[\[Theta], {0, 0, 
     1}].RotationTransform[-\[Phi], {0, 1, 
     0}].RotationTransform[\[Psi], {0, 0, 1}];
*/	
};

function render() {
	var dt=0.0001;
	for(var i=0;i<100;i++){
		var a=ddphi();
		var b=ddpsi();
		var c=ddtheta();
		var d=dx();
		var e=dy();
		phi+=dphi*dt;
		psi+=dpsi*dt;
		theta+=dtheta*dt;
		x+=d*dt;
		y+=e*dt;
		dphi+=a*dt;
		dpsi+=b*dt;
		dtheta+=c*dt;
	}
	positionCylinder(0,0,0);

	requestAnimationFrame(render);
			controls.update();
	renderer.render(scene, camera);
}
render();
